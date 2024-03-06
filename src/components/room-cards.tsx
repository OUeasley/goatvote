import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link";
import {client} from "@/lib/redis";
import {logger} from "@/lib/logger";



async function getAllRooms() {
  'use server';

  // Assuming 'votingRooms' is the key for the hash storing room ID and name pairs
  const rooms = await client.hgetall('votingRooms');

  const results = [];
  for (const [roomId, roomName] of Object.entries(rooms)) {
    results.push({ roomId, roomName });
  }

  logger.info(`Loading rooms`, {
    rooms : results
  });
  return results;
}

export async function RoomCards() {

  const allRooms = await getAllRooms();
  return (
    <section className="mx-10 mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {allRooms.map(room => {
        return (<div className="flex flex-col justify-center gap-2">
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-4">
              <h2 className="text-lg font-bold">{room.roomName}</h2>
              <Link
                className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-lg text-center font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href={`/rooms/${room.roomId}`}
              >
                Join Room
              </Link>
            </CardContent>
          </Card>
        </div>
        )
      })}
    </section>
  )
}
