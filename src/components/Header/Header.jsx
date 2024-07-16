import Link from "next/link"
import Button from "../Button/Button"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

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
              d="M224 120v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-52a4 4 0 0 0-4-4h-40a4 4 0 0 0-4 4v52a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a16 16 0 0 1 4.69-11.31l80-80a16 16 0 0 1 22.62 0l80 80A16 16 0 0 1 224 120"
            ></path>
          </svg>
        </Link>
        <Link
          href="/search"
          className="my-1 h-[80px] rounded-xl px-8 py-5 duration-150 hover:bg-threads-gray-dark md:ml-[5%]"
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
      </nav>
      <div className="backdrop-blur-custom fixed h-[80px] w-full bg-threads-gray bg-opacity-60 md:hidden"></div>
      <Link href="/login">
        <Button className="fixed end-0 z-10 mr-[10%] mt-6 flex h-10 min-w-[150px] max-w-[150px] items-center justify-center bg-white px-5 font-semibold">
          Se connecter
        </Button>
      </Link>
    </header>
  )
}
