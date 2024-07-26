"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { MongoClient, ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const deletePost = async (postId) => {
  const session = await getServerSession(authOptions)

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT)

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE)

  // Get the post
  let post = await db
    .collection("posts")
    .find({ _id: new ObjectId(postId) })
    .limit(1)
    .toArray()

  // If the post doesn't exist
  if (post.length === 0) {
    throw new Error("Ce post n'existe pas")
  }

  // If the user is not the author of the post
  if (post[0].pseudo !== session.user.pseudo) {
    throw new Error("Vous ne pouvez pas supprimer ce thread")
  }

  // Clear the post
  try {
    await db.collection("posts").deleteOne({ _id: new ObjectId(postId) })
  } catch (error) {
    throw new Error(error)
  }

  await client.close()

  // Delete the cache
  revalidatePath("/", "/[pseudo]")
}
