import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout"
import Post from "@/components/Post/Post"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import NewPostForm from "@/components/NewPostForm/NewPostForm"

export default async function Index() {
  const session = await getServerSession(authOptions)

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
      {/* New posts */}
      {session?.user && (
        <div>
          <NewPostForm />
        </div>
      )}

      {/* Posts */}
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </ConnectedLayout>
  )
}
