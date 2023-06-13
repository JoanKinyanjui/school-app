import Image from 'next/image';
import styles from '../styles/dashboard.module.css';
import Head from 'next/head';
import 'animate.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
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
  const [school, setSchool] = useState(null);
  const [error, setError] = useState(null);


// Authorize school Data
let token;
let schoolId;
let symbol;


useEffect(() => {
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token');
    schoolId = JSON.parse( window.localStorage.getItem('school'))._id ;
    symbol = JSON.parse( window.localStorage.getItem('school')).symbol ;
  }
  console.log("==>",schoolId,symbol);
  if (schoolId) {
    fetchSchoolData(schoolId);
  }
}, [schoolId]);

const fetchSchoolData = async (schoolId) => {
  try {
    const response = await fetch(`http://localhost:5000/school/${schoolId}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setSchool(data);
    } else {
      setError('School not found');
    }
  } catch (error) {
    setError('Error fetching school data');
  }
};


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
     <p className={`${styles.Numbers} mx-auto py-2 text-6xl`}>{school && school.pending}</p>
      <p className='mx-auto text-stone-500 text-xl'>Pending</p>
    </div>
    </Link>
    </div>
 
  <div className={`${styles.StatusBoxesBig}  flex place-content-center items-center`}>
  <Link href='/completed'>
    <div className='grid place-content-center'> 
     <p className={`${styles.Numbers} mx-auto py-2 text-3xl`}>{school && school.completed}</p>
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
        <Register  onClose={handleClose} symbol={symbol && symbol}/>
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
<img className={`${styles.DashboardMobileImageDv} w-full h-full`} src='https://cdn.pixabay.com/photo/2022/11/11/01/24/family-7584005_640.jpg'/>

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