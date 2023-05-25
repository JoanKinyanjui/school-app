import Link from 'next/link';
import styles from '../styles/Completed.module.css';
import {BiSearchAlt2} from 'react-icons/bi'

function Completed() {
  return (
  
    <>
       <div className={`${styles.SearchBarDiv} flex items-center justify-between w-full `}>
  <Link href='/dashboard' className='flex w-full'>
  <p className={`${styles.fitBitName} flex pl-4 md:pl-12`}>Better You <span className={`${styles.Period}`}>.</span></p>
  </Link>
    <form className={`${styles.FormDiv} flex items-end py-4 bg-transparent`} >
        <label> <BiSearchAlt2 className='text-2xl text-green-600 mx-4' /></label>
        <input  type='text'  placeholder='St. Austin...' className={`${styles.SearchBarInputField} bg-transparent`} />
    </form>
    </div>
<div className={`${styles.SchoolsDiv}  my-6`}>
       <div className={`${styles.SchooLDiv} w-full justify-between flex items-center px-2 md:px-4 my-4`}>
       <div className={`${styles.SchoolProfile} flex justify-center items-center px-10 py-1 font-normal text-md md:text-xl`}>
       17832
       </div>
        <div className={`${styles.StudentsName}`}>Janice Wangeci</div>
        <div className={`${styles.Monogram} px-4 py-2 text-white`}> Completed</div>
       </div>

       <div className={`${styles.SchooLDiv} w-full justify-between flex items-center px-2 md:px-4 my-4`}>
       <div className={`${styles.SchoolProfile} flex justify-center items-center px-10 py-1 font-normal text-md md:text-xl`}>
       17890
       </div>
        <div className={`${styles.StudentsName}`}>Clare Njoki</div>
        <div className={`${styles.Monogram} px-4 py-2 text-white`}> Completed</div>
       </div>

    </div>

</>
  )
}

export default Completed ;