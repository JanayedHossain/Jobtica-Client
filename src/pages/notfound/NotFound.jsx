import Lottie from 'lottie-react'
import notfound from '../../assets/notfound.json'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={notfound} loop={true} className="w-1/4 mx-auto" />
      <p className="text-gray-400 pt-5">Page Not Found</p>
      <Link to={'/'}>
        <button className="btn mt-4 btn-sm bg-transparent border-primary hover:bg-primary hover:text-white">
          Back To Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound