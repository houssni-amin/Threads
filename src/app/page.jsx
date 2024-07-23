import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout"
import Post from "@/components/Post/Post"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import NewPostForm from "@/components/NewPostForm/NewPostForm"
import { MongoClient } from "mongodb"

export default async function Index() {
  const session = await getServerSession(authOptions)

  let posts
  let client
  try {
    // Connete to the MongoDb cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT)

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE)

    // Select the "posts" collection
    posts = await db.collection("posts").find().sort({ creation: -1 }).toArray()

    posts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }))
  } catch (error) {
    throw new Error(error.message)
  }

  await client.close()

  return (
    <ConnectedLayout>
      {/* New posts */}
      {session?.user && <NewPostForm />}

      {/* Posts */}
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </ConnectedLayout>
  )
}
