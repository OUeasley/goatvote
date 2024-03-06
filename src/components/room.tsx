import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Redis from "ioredis"
import {randomUUID} from "node:crypto";
import {redirect} from "next/navigation";
import {client} from "@/lib/redis";

export const listKey = 'votingRooms';

export function Room() {

  async function createRoom(formData: FormData) {
    'use server'

    const roomName = formData.get('roomName');
    if(!roomName){
      throw new Error("Fuck you doing!?!")
    }
    const roomId = randomUUID();

    await client.hset(listKey, roomId, roomName as string);
    redirect(`/rooms/${roomId}`) // Navigate to the new post page
  }

  return (
    <Card className="mt-10 w-full max-w-lg mx-auto">
      <CardHeader className="flex flex-col items-center">
        <div className="mb-1">Create a Room</div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Enter a room name to create or join a room</p>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={createRoom}>
          <div className="grid gap-1">
            <Label htmlFor="room-name" className="pb-2">Room Name</Label>
            <Input id="room-name" name='roomName' placeholder="Enter a room name" required />
          </div>
          <Button className="w-full" variant={'outline'} type="submit">
            Create Room
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
