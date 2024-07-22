"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function NewPostForm() {
  const { data: session } = useSession()

  const profilImage = session?.user.profile || "/picture.png"

  const [textarea, setTextarea] = useState("")

  return (
    <form className="mx-auto flex border-b border-threads-gray-light p-5 md:max-w-[700px] md:px-0">
      <div className="flex size-full">
        <div className="mr-5 max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px]">
          <Image
            src={profilImage}
            alt="User"
            width={50}
            height={50}
            className="size-full rounded-full"
          />
        </div>
        <div className="flex w-full">
          <textarea
            placeholder="Commencer un thread..."
            id="content"
            className="h-full w-full rounded-s-xl border border-threads-gray-light bg-threads-gray p-1 text-white outline-none placeholder:ml-[10%] placeholder:text-threads-gray-light"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>

          <button
            className="size-full w-20 rounded-e-xl border border-threads-gray-light bg-threads-gray font-semibold text-white disabled:opacity-50"
            disabled={textarea === ""}
          >
            Publier
          </button>
        </div>
      </div>
    </form>
  )
}
