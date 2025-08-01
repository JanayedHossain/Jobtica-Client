import Lottie from 'lottie-react'
import loading from '../../assets/loading.json'

const Loading = () => {
  return (
      <div className='fixed top-0 left-0 w-full h-screen z-[999] bg-white flex items-center justify-center'>
          <Lottie animationData={loading} loop={true} className='w-64'/>
    </div>
  )
}

export default Loading