import "./globals.css"

export const metadata = {
  title: "Threads",
  description: "Un clone du réseau social Threads.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
