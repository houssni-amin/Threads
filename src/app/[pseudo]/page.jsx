"use client"

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Post from "@/components/Post/Post"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Profil() {
  const params = useParams()
  const pseudo = params.pseudo.slice(3)

  const [user, setUser] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!pseudo) {
      notFound()
    }
    fetchUserDataPosts()
  })

  const fetchUserDataPosts = async () => {
    const response = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo }),
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error("Une erreur est survenue")
    }

    setUser(data.user)
    setPosts(data.posts)
  }

  const profilImage = user.profile || "/picture.png"

  return (
    <ConnectedLayout>
      <div>
        <div className="mx-auto p-5 text-white md:max-w-[700px] md:px-0">
          <div className="mb-3 flex justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <div>@{pseudo}</div>
            </div>
            <div className="size-[75px]">
              <Image
                src={profilImage}
                alt="Profile picture"
                width={75}
                height={75}
                className="min-h-[75px] min-w-[75px] rounded-full object-cover"
              />
            </div>
          </div>
          <div>{user.bio}</div>
          {user && user.url && (
            <div className="mt-3 text-threads-gray-light">
              <a href={user.url} target="_blank">
                {user.url}
              </a>
            </div>
          )}
        </div>
        {/* Tabs */}
        <div className="mx-auto flex md:max-w-[700px] md:px-0">
          <div className="flex-1 cursor-pointer border-b border-white pb-2 text-center text-white">
            Threads
          </div>

          <div className="flex-1 cursor-pointer border-b border-threads-gray-light pb-2 text-center text-threads-gray-light">
            Réponses
          </div>

          <div className="flex-1 cursor-pointer border-b border-threads-gray-light pb-2 text-center text-threads-gray-light">
            Republications
          </div>
        </div>

        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </ConnectedLayout>
  )
}
