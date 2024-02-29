import {Room} from "@/components/room";
import {RoomCards} from "@/components/room-cards";
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(

async function Component() {

  return (
    <>
      <Room />
      <RoomCards />
    </>


  )
},
{ returnTo: '/rooms' }
);

