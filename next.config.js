const dotenv = require("dotenv")
const path = require("path")

module.exports = (env) => {
  if (env == "phase-development-server") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })
  } else {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.production") })
  }

  return {
    env: {
      MONGODB_CLIENT: process.env.MONGODB_CLIENT,
      MONGODB_DATABASE: process.env.MONGODB_DATABASE,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
  }
}
