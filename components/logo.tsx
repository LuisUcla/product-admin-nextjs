import Image from "next/image"

export default function Logo() {
  return (
    <div className="relative z-20 flex items-center pt-1 text-lg font-medium text-purple-50">
      <Image
        src="/next.svg"
        alt=""
        width={80}
        height={80}
        className="me-3 h-20 w-20"
      />
      <span>Product Admin</span>
    </div>
  )
}