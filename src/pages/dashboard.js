import Image from 'next/image';
import styles from '../styles/dashboard.module.css';
import Head from 'next/head';
import 'animate.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Register from './register';
import Link from 'next/link';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Dashboard() {
  const [open, setOpen] = useState(false);
   const [openMobile,setOpenMobile] = useState(false)
   const handleOpenMobile = () => setOpenMobile(true);
   const handleCloseMobile = () => setOpenMobile(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-screen h-screen">
 <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </Head>

{/* Desktop Design */}
<div className= {`${styles.DesktopDiv} hidden md:grid  w-screen`}>
<div className={`${styles.DashboardMobileImageDivGradient}`}>
  </div>
<div className={`${styles.PendingCompletedDesktop} w-screen flex justify-between px-48`}>
    <div className={`${styles.StatusBoxesBig} flex place-content-center items-center`}>
    <Link href='/pending'>
    <div className='grid place-content-center'> 
     <p className={`${styles.Numbers} mx-auto py-2 text-6xl`}>02</p>
      <p className='mx-auto text-stone-500 text-xl'>Pending</p>
    </div>
    </Link>
    </div>
 
  <div className={`${styles.StatusBoxesBig}  flex place-content-center items-center`}>
  <Link href='/completed'>
    <div className='grid place-content-center'> 
     <p className={`${styles.Numbers} mx-auto py-2 text-3xl`}>400</p>
      <p className='mx-auto text-stone-500 text-xl'>Completed</p>
    </div>
    </Link>
    </div>
  
  </div>
<div className="w-full flex  justify-center place-content-center  ">
<div className={`${styles.DesktopPlus}  rounded-full px-8 flex place-content-center items-center text-white font-medium text-2xl animate__animated animate__bounceIn  animate__infinite animate__slower`}>
<Button onClick={handleOpen }  className=' text-white font-medium text-4xl'>+</Button>
</div>
  </div>
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
  
        <div  className='w-3/4 mx-auto bg-white'>
        <Register  onClose={handleClose} />
        </div>
      </Modal>
    
</div>
{/* Mobile Design */}

<div className={`${styles.MobileDiv} grid md:hidden`} >
<div className={`${styles.DashboardMobileImageDiv} relative`}>
{/* <div className={`${styles.DashboardMobileImageDivGradient1}`}>
  </div> */}
<div className={`${styles.DashboardMobileImageDivGradient}`}>
  </div>
<img className={`${styles.DashboardMobileImageDv} w-full h-full`} src='https://images.pexels.com/photos/5384516/pexels-photo-5384516.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'/>

</div>

<div>
  <div className={`${styles.PendingCompletedMobile} w-screen flex justify-between px-4`}>
    <div className={`${styles.StatusBoxes} flex place-content-center items-center`}>
    <Link href='/pending'>
    <div className='grid place-content-center'> 
     <p className={`${styles.NumbersSmall} mx-auto py-2`}>02</p>
      <p className='mx-auto text-stone-500'>Pending</p>
    </div>
    </Link>
    </div>
    <div className={`${styles.StatusBoxes}  flex place-content-center items-center`}>
    <Link href='/completed'>
    <div className='grid place-content-center'> 
     <p className={`${styles.NumbersSmall} mx-auto py-2`}>400</p>
      <p className='mx-auto text-stone-500'>Completed</p>
    </div>
   </Link>
    </div>
  </div>
  <div className="w-full flex  justify-center place-content-center  ">
<div className={`${styles.MobilePlus}  rounded-full px-8 flex place-content-center items-center text-white font-medium text-2xl animate__animated animate__bounceIn  animate__infinite animate__slower`}>
<Button className=' text-white font-medium text-3xl' onClick={handleOpenMobile}>+</Button>
</div>
  </div>
  <Modal
        open={openMobile}
        onClose={handleCloseMobile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      
        <div className='bg-white md:hidden ' >
        <Register onClose={handleCloseMobile} />
        </div>
      </Modal>
</div>
</div>

    </div>
  )
}

export default Dashboard;