"use client"

import { useState } from "react"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import NewPostForm from "../NewPostForm/NewPostForm"
import { createPortal } from "react-dom"

export default function ConnectedLayout({ children }) {
  const [openModale, setOpenModale] = useState(false)

  return (
    <section className="flex min-h-screen flex-col">
      {openModale &&
        createPortal(
          <div
            className="fixed bottom-0 left-0 right-0 top-0 z-30 flex items-center justify-center bg-gray-900 bg-opacity-80"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModale(false)
              }
            }}
          >
            <div className="w-10/12 overflow-y-auto rounded-xl border border-threads-gray-light bg-threads-modal p-5 shadow lg:w-[740px]">
              <NewPostForm closeModale={() => setOpenModale(false)} />
            </div>
          </div>,
          document.body,
        )}
      <Header openModale={openModale} setOpenModale={setOpenModale} />

      <div className="mt-[90px] flex-1">{children}</div>

      <Footer marginBottom />
    </section>
  )
}
