"use client"

import Image from "next/image"
import Link from "next/link"
import moment from "moment-timezone"
import "moment/locale/fr"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "react-toastify"
import { deletePost } from "@/actions/delete-post"

export default function Post({ post }) {
  const { data: session } = useSession()

  const [optionsAreOpen, setOptionsAreOpen] = useState(false)

  const onDeletePost = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce thread ?")) return

    try {
      await deletePost(post._id)
    } catch (error) {
      return toast.error(error.message)
    }

    toast.success("Le thread a été supprimé.")
  }

  return (
    <div className="post">
      {/* Photo */}
      <Link href={`/@${post.pseudo}`}>
        <div className="mr-5">
          <Image
            src={post.profile}
            alt="Profile picture"
            width={50}
            height={50}
            className="min-h-[50px] min-w-[50px] rounded-full object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="w-full text-white">
        <div className="mb-1 flex gap-3">
          <Link href={`/@${post.pseudo}`} className="font-bold">
            {post.pseudo}
          </Link>
          <div className="relative flex w-full items-center justify-between text-threads-gray-light">
            <div>
              {moment
                .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
                .tz("Europe/Paris")
                .fromNow()}
            </div>
            {session?.user && (
              <div className="cursor-pointer rounded-full p-2 hover:bg-threads-gray-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  onClick={() => {
                    setOptionsAreOpen((prev) => !prev)
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M156 128a28 28 0 1 1-28-28a28 28 0 0 1 28 28M48 100a28 28 0 1 0 28 28a28 28 0 0 0-28-28m160 0a28 28 0 1 0 28 28a28 28 0 0 0-28-28"
                  ></path>
                </svg>
              </div>
            )}
            {optionsAreOpen && session?.user && (
              <div className="options">
                {session?.user && session.user.pseudo != post.pseudo ? (
                  <div className="option">Signaler</div>
                ) : (
                  <>
                    <div className="option">Modifier</div>
                    <div className="option" onClick={onDeletePost}>
                      Supprimer
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {post.content}
      </div>
    </div>
  )
}
