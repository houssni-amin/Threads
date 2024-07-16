"use client"

import Footer from "../Footer/Footer"
import Header from "../Header/Header"

export default function ConnectedLayout({ children }) {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />

      <div className="mt-[90px] flex-1">{children}</div>

      <Footer marginBottom />
    </section>
  )
}
