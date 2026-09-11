import Image from 'next/image'

const Logo = () => {
  return (
    <div className='flex z-20 relative items-center text-lg font-medium text-purple-50 pt-1'>

      <img src="/next.svg" alt="Logo" className="w-20 h-20 me-3 text-white" />
            Product Admin
    </div>
  )
}

export default Logo