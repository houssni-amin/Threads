import Image from "next/image"
import Link from "next/link"
import moment from "moment-timezone"
import "moment/locale/fr"

export default function Post({ post }) {
  return (
    <div className="post">
      {/* Photo */}
      <Link href={`/@${post.pseudo}`}>
        <div className="mr-5">
          <Image
            src={post.profile}
            alt="Profile picture"
            width={50}
            height={50}
            className="min-h-[50px] min-w-[50px] rounded-full object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="w-full text-white">
        <div className="mb-1 flex gap-3">
          <Link href={`/@${post.pseudo}`} className="font-bold">
            {post.pseudo}
          </Link>
          <div className="text-threads-gray-light">
            {moment
              .utc(post.creation, "YYYY-MM-DD HH:mm:ss")
              .tz("Europe/Paris")
              .fromNow()}
          </div>
        </div>

        {post.content}
      </div>
    </div>
  )
}
