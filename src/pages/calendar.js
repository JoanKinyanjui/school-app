import Link from 'next/link';
import styles from '../styles/calendar.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SummaryOfAppointments from '@/components/SummaryOfAppointments';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useRouter } from 'next/router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  };

  

function Calendar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        router.push('/sessions')
    };
    const justClose=()=>{
        setOpen(false)
    }

    
  return (
<>
<div className={`${styles.WholeMobileButton} md:hidden grid`}>
        {/* Mobile */}
 <div className='w-screen'>
    <div className={`${styles.OverallNavMobileTop}`}>
    <div className={`${styles.NavMobileAppointment} flex justify-between items-center py-8`}>
      <Link  href='/progress'>
      <div className='font-medium text-green-600 px-2'><ArrowBackIosIcon /></div>
      </Link>
        <div className='text-lg font-medium text-green-600'>Appointment</div>
    </div>
    </div>
    <div className={`${styles.OkayDivMobile} `}>
    <div className="flex mx-2 ">
        <div className={`${styles.ImageProfileDiv}`}><img className={`${styles.ActualDoctorImgMobile} w-full h-full`}  src='https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1600' /></div>
        <div className='grid text-left w-1/2'>
       <div className='pl-2'>
       <p className='font-normal text-lg'>Dr Upul</p>
         <p className='text-neutral-600'>Therapist</p>
       </div>
       <div className='w-full justify-between flex items-center pl-2'>
        <p>Payment</p>
        <p>Ksh 2500</p>
       </div>
        </div>
    </div>
    <div className='py-6 w-screen grid '>
        <p className='py-2 text-xl pl-2'>Working Hours</p>
        <div className={`${styles.WorkingHoursMobileDiv} w-full`}>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>10:00 AM</div>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>13:00 PM</div>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>19:00 PM</div>
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>10:00 AM</div> */}
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>10:00 AM</div> */}
        </div>
    </div>
    <div className='py-2 w-screen grid'>
        <p className='py-2 text-xl pl-2'>Working Days</p>
        <div className={`${styles.WorkingHoursMobileDiv} flex justify-between overflow-x-automx-4 my-2 `}>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>MON</div>
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>MON</div> */}
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>WED</div>
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>MON</div> */}
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>FRI</div>
        </div>
    </div>
    <div className='py-6'>
    <p className='py-2 text-xl pl-2'>Calendar</p>
    </div>
    </div>
    <div className='w-screen flex place-content-center py-4'>
        <button className={`${styles.BookMobileAppointmentButton} mx-auto text-white`} onClick={handleOpen}>Book Appointments</button>
    </div>
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
      <div className={`${styles.SummaryModalMobile}`}>
      <SummaryOfAppointments  onClose={handleClose} justClose={justClose} />
      </div>
      </Box>
      </Modal>
        
</div>
    </div>

    {/* Desktop */}
    <div className={`${styles.WholeDesktopButton} w-screen`}>
        {/* Mobile */}
 <div className='w-screen'>
    <div className={`${styles.OverallNavMobileTop}`}>
    <div className={`${styles.NavMobileAppointment} flex justify-between items-center py-8`}>
      <Link  href='/progress'>
      <div className='font-semibold text-green-600 px-2'><ArrowBackIosIcon /></div>
      </Link>
        <div className='text-xl font-medium text-green-600'>Appointment</div>
    </div>
    </div>
    <div className={`${styles.OkayDivMobile}`}>
    <div className="flex  w-3/4 mx-auto">
        <div className={`${styles.ImageProfileDiv}`}><img className={`${styles.ActualDoctorImgMobile} w-full h-full`}  src='https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1600' /></div>
        <div className='grid text-left w-1/2'>
       <div className='pl-2'>
       <p className='font-normal text-xl py-2'>Dr Upul</p>
         <p className='text-neutral-600 text-lg'>Therapist</p>
       </div>
       <div className='w-full justify-between flex items-center pl-2 text-xl'>
        <p>Payment</p>
        <p>Ksh 2500</p>
       </div>
        </div>
    </div>
    <div className='py-6  grid  w-3/4 mx-auto'>
        <p className='py-2 text-xl pl-2'>Working Hours</p>
        <div className={`${styles.WorkingHoursMobileDiv} w-full`}>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>10:00 AM</div>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>13:00 PM</div>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>19:00 PM</div>
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>10:00 AM</div> */}
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2`}>10:00 AM</div> */}
        </div>
    </div>
    <div className='py-6  grid  w-3/4 mx-auto'>
        <p className='py-2 text-xl pl-2'>Working Days</p>
        <div className={`${styles.WorkingHoursMobileDiv} w-full `}>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>MON</div>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>TUE</div>
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>WED</div>
            {/* <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>MON</div> */}
            <div className={`${styles.SpecTimeDivMobile} flex items-center place-content-center mx-4 my-2 `}>FRI</div>
        </div>
    </div>
    <div className='py-6  grid  w-3/4 mx-auto'>
    <p className='py-2 text-xl pl-2'>Calendar</p>
    </div>
    </div>
    <div className='w-screen flex place-content-center py-4'>
        <button className={`${styles.BookMobileAppointmentButton} mx-auto text-white`} onClick={handleOpen}>Book Appointments</button>
    </div>
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
      <div className={`${styles.SummaryModalDesktop}`}>
      <SummaryOfAppointments  onClose={handleClose} justClose={justClose} />
      </div>
      </Box>
      </Modal>
        
</div>
    </div>
</>
  )
}

export default Calendar;