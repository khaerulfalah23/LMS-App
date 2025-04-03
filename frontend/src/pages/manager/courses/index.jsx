import { Link } from 'react-router-dom';
import CardCourse from './card';

export default function ManageCoursePage() {
  return (
    <>
      <header className='flex items-center justify-between gap-[30px]'>
        <div>
          <h1 className='font-extrabold text-[28px] leading-[42px]'>
            Manage Courses
          </h1>
          <p className='text-[#838C9D] mt-[1]'>
            Give the best future for your great employees
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <Link
            to='#'
            className='w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap'
          >
            Import File
          </Link>
          <Link
            to='/manager/courses/create'
            className='w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap'
          >
            New Course
          </Link>
        </div>
      </header>
      <section
        id='CourseList'
        className='flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]'
      >
        <CardCourse />
      </section>
    </>
  );
}
