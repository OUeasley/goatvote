import {UpvoteArea} from "@/components/upvote-area";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";


export default withPageAuthRequired(

async function Component({
                                    params: { id },
                                  }: {
  params: { id: string }
}) {
  const session = await getSession();

  return (
      <UpvoteArea id={id} userId={session?.user?.sub}/>
  )
},
  { returnTo: '/rooms' }
)
