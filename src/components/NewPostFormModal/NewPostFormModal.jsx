"use client"

import { createPost } from "@/actions/create-post"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

export default function NewPostFormModal({ closeModale = () => {} }) {
  const { data: session } = useSession()

  const pseudo = session?.user?.pseudo

  const profilImage = session?.user.profile || "/picture.png"

  const [textarea, setTextarea] = useState("")

  const onPrepare = async (formData) => {
    try {
      await createPost(formData)
      setTextarea("")
    } catch (error) {
      return toast.error(error.message)
    }
    closeModale()
  }

  return (
    <form action={onPrepare} className="mx-auto p-4 md:max-w-[700px] md:px-0">
      <div className="mb-5 flex">
        <div className="mr-3 h-[60px] w-[60px] overflow-hidden rounded-full">
          <Image
            src={profilImage}
            alt="User"
            width={60}
            height={60}
            className="size-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex items-center text-lg font-semibold text-white">
          @{pseudo}
        </div>
      </div>
      <div className="flex size-full">
        <div className="flex w-full">
          <textarea
            placeholder="Commencer un thread..."
            id="content"
            className="newPostFormTxt"
            value={textarea}
            name="content"
            onChange={(e) => setTextarea(e.target.value)}
          ></textarea>

          <button className="newPostFormBtn" disabled={textarea === ""}>
            Publier
          </button>
        </div>
      </div>
    </form>
  )
}
