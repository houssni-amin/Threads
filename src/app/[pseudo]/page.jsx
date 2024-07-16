"use client"

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout"
import { useParams } from "next/navigation"
import Image from "next/image"
import Post from "@/components/Post/Post"

export default function Profil() {
  const params = useParams()
  const pseudo = decodeURIComponent(params.pseudo)

  const posts = [
    {
      _id: "1",
      content: "First thread !",
      pseudo: "Houssni_Amin",
      profile: "/picture.png",
    },
    {
      _id: "2",
      content:
        "Lorem ipsum dolor acere, neque iste! Quis, obcaecati. Impedit ipsam dolorum incidunt delectus cupiditate accusamus autem voluptas doloremque quia velit reprehenderit distinctio, architecto officiis accusantium rem eaque odit cumque nihil, optio veniam neque dolorem, necessitatibus hic? Fuga consectetur labore minima quibusdam iste dolorem voluptatum.",
      pseudo: "Emily_Brown",
      profile: "/picture.png",
    },
    {
      _id: "3",
      content: "Just finished a great workout at the gym 💪",
      pseudo: "John_Doe",
      profile: "/picture.png",
    },
    {
      _id: "4",
      content: "Excited to announce my new project launch 🚀",
      pseudo: "Jane_Smith",
      profile: "/picture.png",
    },
    {
      _id: "5",
      content: "Enjoying a relaxing evening with a good book 📖",
      pseudo: "Mark_Johnson",
      profile: "/picture.png",
    },
  ]

  return (
    <ConnectedLayout>
      <div>
        <div className="mx-auto p-5 text-white md:max-w-[700px] md:px-0">
          <div className="mb-3 flex justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">Houssni Amin</h1>
              <div>{pseudo}</div>
            </div>
            <div className="size-[75px]">
              <Image
                src="/picture.png"
                alt="Profile picture"
                width={75}
                height={75}
                className="min-h-[75px] min-w-[75px] rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisi elit. Tempore,
            reiciendis placeat ea ducimus corporis, ipsum quod neque dolor
            repellat sed debitis.
          </div>
          <div className="mt-3 text-threads-gray-light">
            <a
              href="https://threads-houssni-amin.vercel.app/login"
              target="_blank"
            >
              https://threads-houssni-amin.vercel.app/login
            </a>
          </div>
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
