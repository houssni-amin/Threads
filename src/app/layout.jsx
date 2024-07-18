import { ToastContainer } from "react-toastify"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "./Providers"

export const metadata = {
  title: "Threads",
  description: "Un clone du réseau social Threads.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray">
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  )
}
