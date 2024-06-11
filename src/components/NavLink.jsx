import Link from "next/link"
import Image from "next/image"
import home from '@/app/assets/images/NavLinksImages/home.svg'

const NavLink = ({iconImg, title, url}) => {
  return (
    <div>
      <Link href={url} className="flex">
        <Image src={iconImg} alt={title} width={16} height={16} />
        <span>{title}</span>
      </Link>
    </div>
  );
}

export default NavLink