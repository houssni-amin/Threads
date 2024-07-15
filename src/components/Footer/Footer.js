export default function Footer({ mb = "" }) {
  return (
    <footer
      className={`${mb} mt-10 flex flex-col justify-center gap-1 pb-4 text-xs text-threads-gray-light sm:flex-row sm:gap-10 sm:text-sm md:mb-0`}
    >
      <div className="text-center">© Threads, 2024</div>
      <div className="text-center">Conditions générales de Threads</div>
      <div className="text-center">Politique de confidentialité</div>
    </footer>
  )
}
