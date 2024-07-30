"use client"

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Post from "@/components/Post/Post"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { createPortal } from "react-dom"

export default function Profil() {
  const params = useParams()
  const pseudo = params.pseudo.slice(3)
  const router = useRouter()
  const { data: session } = useSession()

  const [user, setUser] = useState([])
  const [posts, setPosts] = useState([])
  const [openModale, setOpenModale] = useState(false)
  const [profileInput, setProfileInput] = useState("")
  const [bioInput, setBioInput] = useState("")
  const [linkInput, setLinkInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!pseudo) {
      router.push("/")
    }
    fetchUserDataPosts()
  }, [])

  useEffect(() => {
    if (openModale) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [openModale])

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

    if (!data.user) {
      router.push("/")
      return
    }

    setUser(data.user)
    setPosts(data.posts)
  }

  const edit = () => {
    setProfileInput(user.profile)
    setBioInput(user.bio)
    setLinkInput(user.url)

    setOpenModale(true)
  }

  const editUser = async () => {
    if (isLoading) return

    setIsLoading(true)

    const response = await fetch("api/user/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo,
        profile: profileInput,
        bio: bioInput,
        url: linkInput,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      toast.error("Une erreur est survenue")
      return
    }

    const newUser = {
      ...user,
      profile: profileInput,
      bio: bioInput,
      url: linkInput,
    }

    setUser(newUser)

    setOpenModale(false)
    setIsLoading(false)

    toast.success("Profil mis à jour")
  }

  const profilImage = user.profile || "/picture.png"

  return (
    <ConnectedLayout>
      {openModale &&
        createPortal(
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModale(false)
              }
            }}
            className="modale-background"
          >
            <div className="modale-foreground">
              {/* Picture */}
              <div className="flex items-center gap-3 border-b border-threads-gray-light pb-5">
                <div className="flex flex-1 flex-col text-white">
                  <label className="font-bold" htmlFor="picture">
                    Photo de profil
                  </label>
                  <input
                    type="url"
                    name="picture"
                    id="picture"
                    className="rounded-lg border border-threads-gray-light bg-threads-gray-dark p-1 placeholder:text-threads-gray-light"
                    placeholder="+ Ajouter une photo de profil"
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                  />
                </div>

                <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
                  <Image
                    src={user.profile}
                    alt="User"
                    width={100}
                    height={100}
                    className="size-full object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mt-5 flex flex-col border-b border-threads-gray-light pb-5 text-white">
                <label className="mb-1 font-bold" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  placeholder="+ Écrire une bio"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="h-9 max-h-72 min-h-9 rounded-lg border border-threads-gray-light bg-threads-gray-dark p-1 placeholder:text-threads-gray-light"
                ></textarea>
              </div>

              {/* Url */}
              <div className="mt-5 flex flex-col border-threads-gray-light pb-5 text-white">
                <label htmlFor="url" className="mb-1 font-bold">
                  Lien
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  placeholder="+ Ajouter un lien"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="rounded-lg border border-threads-gray-light bg-threads-gray-dark p-1 placeholder:text-threads-gray-light"
                />
              </div>
              <div>
                <button
                  onClick={editUser}
                  disabled={isLoading}
                  className="mt-5 h-14 w-full rounded-lg bg-white"
                >
                  Terminé
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
      <div>
        <div className="mx-auto p-5 text-white md:max-w-[700px] md:px-0">
          <div className="mb-3 flex justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <div>@{pseudo}</div>
            </div>

            <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
              <Image
                src={profilImage}
                alt="Profile picture"
                width={100}
                height={100}
                unoptimized
                className="size-full object-cover"
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

          {/* Updating */}
          {session?.user?.pseudo === pseudo && (
            <div
              onClick={edit}
              className="mt-6 cursor-pointer rounded-xl border border-threads-gray-light py-2 text-center text-white"
            >
              Modifier le profil
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
