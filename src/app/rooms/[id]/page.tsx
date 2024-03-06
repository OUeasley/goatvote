import {UpvoteArea} from "@/components/upvote-area";
import {getSession, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {TopNav} from "@/components/top-nav";


// @ts-ignore
export default withPageAuthRequired(
  // @ts-ignore
  async function Component({
                                    params: { id },
                                  }: {
  params: { id: string }
}) {
  const session = await getSession();

  return (
    <>
      <TopNav />
      {/* @ts-ignore */}
      <UpvoteArea id={id} userId={session?.user?.sub}/>
    </>
  )
},
  { returnTo: '/rooms' }
)
