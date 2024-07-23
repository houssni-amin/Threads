import Link from "next/link"
import Button from "../Button/Button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function Header() {
  // Retrieves the current URL path
  const pathname = usePathname()

  // Gets the user session data
  const { data: session } = useSession()

  return (
    <header className="flex justify-between">
      <div className="fixed left-0 z-10 ml-[10%] mt-6 duration-150 hover:scale-110">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Threads"
            width={41}
            height={45}
            style={{ width: "35px", height: "auto" }}
          />
        </Link>
      </div>

      <nav className="bg-red backdrop-blur-custom fixed bottom-0 z-0 flex h-[88px] w-full justify-around bg-threads-gray bg-opacity-60 md:top-0 md:justify-center">
        <Link
          href="/"
          className="my-1 h-[80px] rounded-xl px-8 py-5 duration-150 hover:bg-threads-gray-dark md:mr-[5%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-10 ${pathname === "/" ? "text-white" : "text-threads-gray-light"}`}
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m222.14 105.85l-80-80a20 20 0 0 0-28.28 0l-80 80A19.86 19.86 0 0 0 28 120v96a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-52h24v52a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-96a19.86 19.86 0 0 0-5.86-14.15M204 204h-40v-52a12 12 0 0 0-12-12h-48a12 12 0 0 0-12 12v52H52v-82.35l76-76l76 76Z"
            ></path>
          </svg>
        </Link>

        <Link
          href="/search"
          className="my-1 h-[80px] rounded-xl px-8 py-5 duration-150 hover:bg-threads-gray-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`size-10 ${pathname === "/search" ? "text-white" : "text-threads-gray-light"}`}
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
            ></path>
          </svg>
        </Link>

        {session?.user?.email && (
          <Link
            href={`/@${session.user.pseudo}`}
            className="my-1 h-[80px] rounded-xl px-8 py-5 duration-150 hover:bg-threads-gray-dark md:ml-[5%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`size-10 ${pathname.includes("@") ? "text-white" : "text-threads-gray-light"}`}
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"
              ></path>
            </svg>
          </Link>
        )}
      </nav>
      <div className="backdrop-blur-custom fixed h-[80px] w-full bg-threads-gray bg-opacity-60 md:hidden"></div>

      {/* Checks if the user is logged in by verifying the presence of an email in the session */}
      {session?.user?.email ? (
        <Button
          onClick={() => signOut()}
          className="fixed end-0 z-10 mr-[10%] mt-6 flex h-10 min-w-[160px] max-w-[160px] items-center justify-center bg-white px-5 font-semibold"
        >
          Se deconnecter
        </Button>
      ) : (
        <Link href="/login">
          <Button className="fixed end-0 z-10 mr-[10%] mt-6 flex h-10 min-w-[150px] max-w-[150px] items-center justify-center bg-white px-5 font-semibold">
            Se connecter
          </Button>
        </Link>
      )}
    </header>
  )
}
