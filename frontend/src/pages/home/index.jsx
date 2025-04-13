import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className='relative  flex flex-col flex-1 p-[10px]'>
      <div className='absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#060A23] -z-10 rounded-[20px]'>
        <img
          src='/assets/images/backgrounds/background-glow.png'
          className='absolute bottom-0 transform -translate-x-1/2 left-1/2'
          alt=''
        />
      </div>
      <div className='flex items-center justify-center min-h-[calc(100vh-20px)]'>
        <div className='flex flex-col w-[400px] h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#080A2A]'>
          <Link
            to='/manager/sign-in'
            className='w-full rounded-full border p-[14px_20px] text-center font-semibold text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]'
          >
            Manager
          </Link>
          <hr className='border-[#262A56]' />
          <Link
            to='/student/sign-in'
            className='w-full rounded-full border p-[14px_20px] text-center font-semibold text-white bg-[#662FFF] border-[#8661EE] shadow-[-10px_-6px_10px_0_#7F33FF_inset]'
          >
            Student
          </Link>
        </div>
      </div>
    </div>
  );
}
