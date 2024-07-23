"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { MongoClient } from "mongodb"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const createPost = async (formData) => {
  const session = await getServerSession(authOptions)

  // If the user is disconnect
  if (!session.user) {
    throw new Error("Vous devez être connecté")
  }

  let client
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT)

    // Connecter to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE)

    // Add th post
    await db.collection("posts").insertOne({
      pseudo: session.user.pseudo,
      content: formData.get("content"),
      profile: session.user.profile,
      creation: new Date(),
    })
  } catch (error) {
    await client.close()
    throw new Error(error)
  }

  await client.close()

  revalidatePath("/")
}
