import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout"

export default function Search() {
  return (
    <ConnectedLayout>
      <div className="relative mx-auto h-24 w-full p-5 md:max-w-[700px] md:px-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-10 top-[34px] size-7 text-threads-gray-light"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
          ></path>
        </svg>
        <input type="search" placeholder="Rechercher" className="search" />
      </div>
    </ConnectedLayout>
  )
}
