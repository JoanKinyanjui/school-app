import styles from '../styles/calendar.module.css';
import {CgClose} from 'react-icons/cg'

function SummaryOfAppointments({onClose,justClose}) {
  return (
    <div className='relative w-full mx-auto grid h-full  '>

<div className={`${styles.CancelDiv} flex place-content-end  px-4 `}>
 <button onClick={justClose} ><CgClose className='text-2xl md:text-3xl text-green-600' /></button>
</div>
        <div className='pt-2 flex place-content-center'>
            <p >You have booked your therapy sessions as follows :</p>
        </div>
       <div className={`${styles.Haiyaaa} grid justify-center mx-auto`}>
       <div className='flex w-full py-2'>
            <p className='px-2 text-left text-green-600 '>Session 1 :</p> <p className=' text-left'>21st May 2023, 17:00</p>
        </div>
        <div className='flex w-ful py-2l'>
            <p className='px-2 text-left text-green-600 '>Session 2 :</p> <p className=' text-left'>21st May 2023, 21:00</p>
        </div>
        <div className='flex w-full py-2'>
            <p className='px-2 text-left text-green-600 '>Session 3 :</p> <p className=' text-left'>22nd May 2023, 08:00</p>
        </div>
        <div className='flex w-full py-2'>
            <p className='px-2 text-left text-green-600 '>Session 4 :</p> <p className=' text-left'>22nd May 2023, 17:00</p>
        </div>
        <div className='flex w-full py-2'>
            <p className='px-2 text-left text-green-600 '>Session 5 :</p> <p className=' text-left'>23rd May 2023, 11:00</p>
        </div>
       </div>

       <div className='w-full place-content-center items-center flex py-4'>
        <button className={`${styles.ConfirmSummarybutton}`} onClick={onClose}>Confirm</button>
       </div>
    </div>
  )
}

export default SummaryOfAppointments