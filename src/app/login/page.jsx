import Link from "next/link"

export default function Login() {
  return (
    <div className="flex flex-col">
      <h1 className="text-center font-bold text-white sm:text-xl">
        Comment souhaitez-vous utilisez Threads ?
      </h1>

      <div className="mx-auto max-w-[450px]">
        {/* Signup and Signin */}
        <Link href="/login/signup">
          <div className="auth-method">
            <h2 className="font-bold text-white">
              Continuer avec une adresse email
            </h2>
            <div className="mt-2 text-xs text-threads-gray-light">
              Connectez-vous ou créez un profil Threads avec votre adresse
              email. Cela vous permettra de publier du contenu et
              d&apos;interagir sur Threads.
            </div>
          </div>
        </Link>

        {/* Invited */}
        <Link href="/login/pass">
          <div className="auth-method">
            <h2 className="font-bold text-white">Utiliser sans profil</h2>
            <div className="mt-2 text-xs text-threads-gray-light">
              Vous pouvez naviguer dans Threads sans profil, mais vous ne
              pourrez pas interagir avec du contenu ni en publier.
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
