
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {randomUUID} from "node:crypto";
import Redis from "ioredis";
import {revalidatePath} from "next/cache";
import {client} from "@/lib/redis";
import {logger} from "@/lib/logger";
import { metricsClient } from '@/lib/metrics';



export async function UpvoteArea({
                             id,
  userId
                           }: {
  id : string,
  userId : string
}) {

  async function getAllItemsWithVotes(roomId: string) {
    'use server';

    // Fetch the room name using the roomId
    const roomName = await client.hget('votingRooms', roomId);

    if (!roomName) {
      console.log(`No room found with ID = ${roomId}`);
      return null; // or handle this case as needed
    }

    const roomItemsKey = `room:${roomId}:items`;
    const items = await client.hgetall(roomItemsKey);

    const results = [];

    for (const [itemId, itemName] of Object.entries(items)) {
      const itemVotesKey = `room:${roomId}:item:${itemId}:votes`;
      const totalVotes = await client.scard(itemVotesKey);
      results.push({ roomId, roomName, itemId, itemName, totalVotes });
    }

    logger.info(`All items with votes in room ${roomId} (${roomName}):`, {results, roomId, roomName});
    return results;
  }



  async function toggleVote(roomId : string, itemId : string) {
    'use server'

    const itemVotesKey = `room:${roomId}:item:${itemId}:votes`;

    // Check if the user has already voted
    const hasVoted = await client.sismember(itemVotesKey, userId);

    if (hasVoted) {
      // User has voted, remove their vote
      await client.srem(itemVotesKey, userId);
      metricsClient.decrement(itemVotesKey);

      logger.info(`User ${userId} removed vote from item ${itemId} in room ${roomId}`, {itemId, roomId});
    } else {
      // User hasn't voted, add their vote
      await client.sadd(itemVotesKey, userId);
      metricsClient.increment(itemVotesKey);
      logger.info(`User ${userId} voted for item ${itemId} in room ${roomId}`, {userId, itemId, roomId});
    }
    revalidatePath(`/room/${id}`)
  }

  async function createItem(formData: FormData) {
    'use server'

    const itemName = formData.get('itemName');
    if(!itemName){
      throw new Error("Fuck you doing!?!")
    }
    const itemId = randomUUID();

    const roomItemsKey = `room:${id}:items`;
    await client.hset(roomItemsKey, itemId, itemName as string);
    logger.info(`Added item with id ${id} name ${itemName}`, {itemId: id, itemName});
    revalidatePath(`/room/${id}`)
  }

  async function getRoomById(roomId: string) {
    'use server';

    // Assuming 'votingRooms' is the key for the hash storing room ID and name pairs
    const roomName = await client.hget('votingRooms', roomId);

    if (roomName) {
      logger.info(`Room found: ID = ${roomId}, Name = ${roomName}`, {roomId, roomName});
      return { roomId, roomName };
    } else {
      logger.info(`No room found with ID = ${roomId}`, {roomId});
      return null; // or throw an error, depending on your error handling strategy
    }
  }

  const items = await getAllItemsWithVotes(id);
  const room = await getRoomById(id);

  return (
    <div key="1" className="flex flex-col min-h-screen w-full">
      <main className="flex-1">
        <div className="container flex-1 max-w-6xl px-4 md:px-6">
          <div className="flex flex-col gap-4 min-h-[calc(100vh_-_theme(spacing.24))_]">
            <div className="grid gap-2">
              <h1 className="font-semibold text-4xl">Room: {room?.roomName}</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Create and manage items. Enter text and click the button to create new items. Upvote items that you think are important!
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <form action={createItem}>
                  <Input name={'itemName'} className="w-[300px] mb-5" placeholder="Enter item name" type="text" />
                  <Button variant={"outline"}>Submit</Button>
                </form>
              </div>
            </div>
            <div className="grid gap-4">
              {items.map(item => {
                return (<div className="flex items-center gap-4">
                  <form action={toggleVote.bind(null,id,item.itemId)} >
                  <Button variant="outline">
                    <UpvoteIcon className="text-gray-500 dark:text-gray-400" size={30}/>
                  </Button>
                  </form>
                  <div className="flex-1 grid items-start gap-1.5 text-sm">
                    <p className="font-semibold">{item.itemName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total votes: {item.totalVotes}</p>
                  </div>
                </div> )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const UpvoteIcon = ({size = 24, color = 'currentColor', ...props}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path
      d="M4 14h4v7a1 1 0 001 1h6a1 1 0 001-1v-7h4a1.001 1.001 0 00.781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 004 14z"/>
  </svg>
);
