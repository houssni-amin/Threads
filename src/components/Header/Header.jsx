import Link from "next/link"
import Button from "../Button/Button"
import Image from "next/image"

export default function Header() {
  return (
    <header>
      <div className="fixed z-[999] flex h-16 w-full items-center justify-around backdrop-blur-3xl md:backdrop-blur-0">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Threads"
            width={41}
            height={45}
            style={{ width: "40px", height: "auto" }}
          />
        </Link>
        <div>
          <Button className="flex h-10 items-center bg-white px-5">
            Se connecter
          </Button>
        </div>
      </div>

      <nav className="pointer-events-none fixed bottom-0 flex h-16 w-full items-center justify-around backdrop-blur-3xl md:top-0 md:justify-center">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-10 text-white md:mr-14"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M224 120v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-52a4 4 0 0 0-4-4h-40a4 4 0 0 0-4 4v52a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a16 16 0 0 1 4.69-11.31l80-80a16 16 0 0 1 22.62 0l80 80A16 16 0 0 1 224 120"
            ></path>
          </svg>
        </Link>
        <Link href="/search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-10 text-white md:ml-14"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
            ></path>
          </svg>
        </Link>
      </nav>
    </header>
  )
}
