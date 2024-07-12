import Footer from "@/components/Footer/Footer"
import Image from "next/image"

export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute left-0 right-0 top-0 z-0 aspect-[1785/510]">
        <Image
          src="/welcome.webp"
          alt="welcome"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="z-10 flex-1">{children}</div>

      <Footer />
    </div>
  )
}
