"use client"

import { createPost } from "@/actions/create-post"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

export default function NewPostForm({ closeModale = () => {} }) {
  const { data: session } = useSession()

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
    <form
      action={onPrepare}
      className="mx-auto flex border-b border-threads-gray-light p-5 md:max-w-[700px] md:px-0"
    >
      <div className="flex size-full">
        <div className="mr-5 max-h-[50px] min-h-[50px] min-w-[50px] max-w-[50px]">
          <Image
            src={profilImage}
            alt="User"
            width={50}
            height={50}
            className="size-full rounded-full object-cover"
            unoptimized
          />
        </div>
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
