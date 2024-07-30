import { MongoClient } from "mongodb"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth from "next-auth/next"

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials

        try {
          // Connect to the MongoDB cluster
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT)

          // Connect to the MongoDB database
          const db = client.db(process.env.MONGODB_DATABASE)

          // Get the user for this email
          let user = await db
            .collection("users")
            .find({ email })
            .limit(1)
            .toArray()

          // If the email is not used
          if (user.length === 0) {
            await client.close()

            throw new Error("Cet utilisateur n'existe pas.")
          }

          // Verify the password
          const isPasswordValid = await bcrypt.compare(
            password,
            user[0].password,
          )

          // If the password is false
          if (!isPasswordValid) {
            await client.close()

            throw new Error("Mot de passe incorrect.")
          }

          // the user is authenticated
          // Format user don't add sensitive data !
          user = user.map((user) => ({
            _id: user._id.toString(),
            username: user.username,
            pseudo: user.pseudo,
            email: user.email,
            profile: user.profile,
          }))[0]

          await client.close()

          return user
        } catch (error) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, user, token }) {
      session.user = token.user

      const { email } = session.user

      // Connect to the MongoDB cluster
      const client = await MongoClient.connect(process.env.MONGODB_CLIENT)

      // Connect to the MongoDB database
      const db = client.db(process.env.MONGODB_DATABASE)

      let userDB = await db
        .collection("users")
        .find({ email })
        .limit(1)
        .toArray()

      userDB = userDB.map((user) => ({
        _id: user._id.toString(),
        username: user.username,
        pseudo: user.pseudo,
        email: user.email,
        profile: user.profile,
      }))[0]

      await client.close()

      return {
        ...session,
        user: {
          ...userDB,
        },
      }
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
