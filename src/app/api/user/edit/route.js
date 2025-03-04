import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function POST(request) {
  const data = await request.json()

  const pseudo = data.pseudo
  const profile = data.profile
  const bio = data.bio
  const url = data.url

  let client

  try {
    // Connete to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT)

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE)

    // Verify if the user exists
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray()

    if (user.length === 0) {
      await client.close()

      return NextResponse.json(
        {
          error: "Cet utilisateur n'existe pas.",
        },
        { status: 404 },
      )
    }

    // Updating
    await db.collection("users").updateOne(
      { pseudo },
      {
        $set: {
          profile,
          bio,
          url,
        },
      },
    )

    await client.close()

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    await client.close()
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    )
  }
}
