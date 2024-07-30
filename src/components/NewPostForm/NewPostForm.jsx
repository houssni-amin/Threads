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
        <div className="flex items-center">
          <div className="mr-5 h-[60px] w-[60px] overflow-hidden rounded-full">
            <Image
              src={profilImage}
              alt="User"
              width={60}
              height={60}
              unoptimized
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-1">
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
