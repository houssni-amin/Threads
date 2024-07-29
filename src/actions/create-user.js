"use server"

import { MongoClient } from "mongodb"
import bcrypt from "bcrypt"
import { checkEmailSyntax } from "@/utlis/checkEmailSyntax"

export const createUser = async (username, pseudo, email, password) => {
  if (!username || !pseudo || !email || !password) {
    return toast.error("Veuillez remplir tous les champs.")
  }

  if (!checkEmailSyntax(email)) {
    return toast.error("Veuillez entre un email valide.")
  }

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT)

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE)

  try {
    // Verify if this email is already used
    let user = await db.collection("users").find({ email }).limit(1).toArray()

    // If the email is arlready used
    if (user.length !== 0) {
      await client.close()
      throw new Error("Cet email est déjà utilisé.")
    }

    // Verify if this pseudo is already used
    user = await db.collection("users").find({ pseudo }).limit(1).toArray()

    // If the pseudo is arlready used
    if (user.length !== 0) {
      await client.close()
      throw new Error("Ce pseudo est déjà utilisé.")
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10)

    // Create the use
    await db.collection("users").insertOne({
      username,
      pseudo,
      email,
      password: encryptedPassword,
      profile: "/picture.png",
      bio: "",
      url: "",
      creation: new Date(),
    })
  } catch (error) {
    await client.close()
    throw new Error(error)
  }

  await client.close()
}
