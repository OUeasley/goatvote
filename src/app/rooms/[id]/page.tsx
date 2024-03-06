import {UpvoteArea} from "@/components/upvote-area";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {TopNav} from "@/components/top-nav";


export default withPageAuthRequired(

async function Component({
                                    params: { id },
                                  }: {
  params: { id: string }
}) {
  const session = await getSession();

  return (
    <>
      <TopNav />
      <UpvoteArea id={id} userId={session?.user?.sub}/>
    </>
  )
},
  { returnTo: '/rooms' }
)
