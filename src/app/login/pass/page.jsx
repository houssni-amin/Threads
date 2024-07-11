import Image from "next/image"

export default function Pass() {
  return (
    <div className="flex justify-center pt-48">
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
            className="mr-2 h-[25px]"
          />
          <div>
            <h2 className="text-base font-bold text-white">
              Utiliser Threads sans profil
            </h2>
            <p className="text-xs text-threads-gray-light">
              Vous pourrez utiliser Threads sans profil pour naviguer sur
              l&apos;application, mais vous ne pourrez pas faire de
              publications, interagir avec du contenu, ni obtenir de
              recommandations. En savoir plus
            </p>
          </div>
        </div>
        <div className="flex">
          <Image
            src="/oeil.png"
            width={25}
            height={25}
            className="mr-2 h-[25px]"
            alt="not connected icon"
          />
          <div>
            <h2 className="text-base font-bold text-white">
              Vous pouvez modifier votre choix à tout moment
            </h2>
            <p className="text-xs text-threads-gray-light">
              Si vous voulez utiliser Threads avec un profil, vous pouvez vous
              connecter avec un compte Instagram.
            </p>
          </div>
        </div>
        <div>
          <button className="mb-3 mt-8 w-full rounded-2xl bg-white p-3 sm:mt-6">
            Utiliser sans profil
          </button>
          <button className="w-full rounded-2xl border bg-threads-gray p-3 text-white">
            Retour
          </button>
        </div>
      </div>
    </div>
  )
}
