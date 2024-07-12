"use client"

import Button from "@/components/Button/Button"
import { setCookie } from "cookies-next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Pass() {
  const router = useRouter()

  const onContinue = () => {
    // Generate a new cookie
    setCookie("guest", "true")

    // redirect
    router.push("/")
  }

  return (
    <div className="flex justify-center pt-48 sm:pt-72">
      <div className="flex max-w-[300px] flex-col gap-5">
        <h1 className="mb-5 text-xl font-bold text-white sm:mb-3">
          Utiliser Threads sans profil ?
        </h1>

        <div className="flex">
          <Image
            src="/pass.png"
            width={25}
            height={25}
            alt="not connected icon"
            className="mr-2 size-[25px]"
          />
          <div>
            <h2 className="text-base font-bold text-white">
              Utiliser Threads sans profil
            </h2>
            <p className="text-xs text-threads-gray-light">
              Vous pourrez utiliser Threads sans profil pour naviguer sur
              l&apos;application, mais vous ne pourrez pas faire de
              publications, interagir avec du contenu, ni obtenir de
              recommandations.
            </p>
          </div>
        </div>

        <div className="flex">
          <Image
            src="/oeil.png"
            width={25}
            height={25}
            className="mr-2 size-[25px]"
            alt="not connected icon"
          />
          <div>
            <h2 className="text-base font-bold text-white">
              Vous pouvez modifier votre choix à tout moment
            </h2>
            <p className="text-xs text-threads-gray-light">
              Si vous voulez utiliser Threads avec un profil, vous pouvez vous
              connecter avec votre adresse email.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-6">
          <Button onClick={onContinue} className="mb-3 bg-white">
            Utiliser sans profil
          </Button>
          <Link href="/login">
            <Button className="bg-threads-gray text-white">Retour</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
