"use client"

import Link from "next/link"

export default function Signin() {
  const prepareLogin = async (FormData) => {
    const email = FormData.get("email")
    const password = FormData.get("password")

    console.log(email, password)
  }

  return (
    <div className="mx-auto max-w-[500px] p-5 pt-[200px] text-white md:px-0 md:pt-[300px]">
      <div className="mb-4 flex">
        <Link href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="mr-2 size-9"
          >
            <path
              fill="currentColor"
              d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
            ></path>
          </svg>
        </Link>
        <p className="text-2xl font-bold">Connectez-vous</p>
      </div>
      <form action={prepareLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="info"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="info"
          required
        />
        <button className="w-full rounded-3xl bg-white py-4 text-black">
          Se connecter
        </button>
      </form>
      <div className="my-4 flex items-center justify-center">
        <div className="w-1/4 border-t border-threads-gray-light"></div>
        <div className="mx-4 text-threads-gray-light">ou</div>
        <div className="w-1/4 border-t border-threads-gray-light"></div>
      </div>
      <Link href="/login/signup">
        <button className="w-full rounded-3xl bg-white py-4 text-black">
          Créer un compte
        </button>
      </Link>
    </div>
  )
}
