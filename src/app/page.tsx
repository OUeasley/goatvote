import Link from "next/link";
import { getSession} from '@auth0/nextjs-auth0';

export default async function Home() {

  const session = await getSession();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            height="430"
            src="/gvote.png"
            width="650"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">Vote for the Greatest Goats</h1>
              <p
                className="max-w-[600px] text-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Welcome to Goat Vote, the definitive platform for determining the greatest goats of all time. Join the
                community and make your voice herd.
              </p>
              {JSON.stringify(session?.user)}
            </div>
            {session?.user ? <Link
              className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-lg text-center font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/rooms"
            >
              Go To Rooms
            </Link> : <Link
              className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-lg text-center font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/rooms"
            >
              Log In
            </Link>
            }
          </div>
        </div>
      </div>
    </section>
  );
}
