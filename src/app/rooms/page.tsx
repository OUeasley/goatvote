import {Room} from "@/components/room";
import {RoomCards} from "@/components/room-cards";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {TopNav} from "@/components/top-nav";

export default withPageAuthRequired(

async function Component() {

  return (
    <>
      <TopNav />
      <Room />
      {/*@ts-ignore */}
      <RoomCards />
    </>


  )
},
{ returnTo: '/rooms' }
);

