import Link from "next/link";
import styles from "../styles/sessions.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DoneIcon from '@mui/icons-material/Done';
import {BsThreeDots} from "react-icons/bs"
import { useEffect, useState } from "react";
// import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'white', // Set the background color to green
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#50C878', // Set the progress bar color to dark green
  },
}));




function Sessions() {
 

  return (
    <div>
      {/* Mobile DEsign */}
      <div className="grid md:hidden">
        <div>
        <div className={`${styles.NavMobileAppointment} px-4 flex justify-between items-center py-2`}>
      <Link  href='/progress'>
      <div className='font-medium text-green-600 px-2'><ArrowBackIosIcon /></div>
      </Link>
        <div className='text-lg font-medium text-green-600'><img className={`${styles.ProfileRightMobileTop}`} src='https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'/></div>
    </div>
        </div>
        <div className={`${styles.FirstDivMobileTop} items-center grid `}>
          <div className="grid px-4">
            <p>Hello ,</p>
            <p className="py-2 text-2xl font-semibold">ADJH 73646</p>
          </div>

          <div className="flex place-content-center items-center justify-between">
<div className="grid text-left px-4">
  <p className="font-semibold text-lg">Today's Tuesday</p>
  <p className="text-neutral-600">Dec 12, 2023</p>
</div>

<div className="px-4">
  <p className="font-normal ">20% Done</p>
</div>
          </div>
          <div className="  flex place-content-center items-center w-11/12 mx-auto ">
          <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={20} />
    </Box>

          </div>

        </div>
        <div className={`${styles.AllSessionsMobileDiv} grid items-center`}>
         <div className={`${styles.SingleSessionMobileDiv} grid`}>
        <div className=" flex items-center justify-between px-4 my-4">
        <div>
        <p className="font-medium"> Dr Buthia</p>
        </div>
        <div className="flex items-center">
         <p className="text-sm text-neutral-500 px-2">2days ago</p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center font-bold`}>
            <p><DoneIcon /></p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 1</p>
        </div>
         </div>

         <div className={`${styles.SingleSessionMobileDiv} grid`}>
        <div className=" flex items-center justify-between px-4 my-4">
        <div>
        <p className="font-medium"> Dr Buthia</p>
        </div>
        <div className="flex items-center">
         <p className="text-sm text-neutral-500 px-2">2days ago</p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center font-bold`}>
            <p><DoneIcon /></p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 2</p>
        </div>
         </div>

         <div className={`${styles.SingleSessionMobileDiv} grid`}>
        <div className=" flex items-center justify-between px-4 my-4">
        <div>
        <p className="font-medium"> Dr Buthia</p>
        </div>
        <div className="flex items-center">
         <p className="text-sm text-neutral-500 px-2">2days, 12hrs</p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center font-bold`}>
            <p><BsThreeDots /></p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 3</p>
        </div>
         </div>
         
        </div>
      </div>

{/* Desktop */}


      <div className="md:grid hidden w-screen">
        <div>
        <div className={`${styles.NavMobileAppointment} px-36 mx-auto flex justify-between items-center py-2`}>
<div className="flex justify-between md:w-3/4 py-4 mx-auto">
<Link  href='/progress'>
      <div className='font-medium text-green-600 px-2'><ArrowBackIosIcon /></div>
      </Link>
        <div className='text-lg font-medium text-green-600'><img className={`${styles.ProfileRightMobileTop}`} src='https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'/></div>
</div>
    </div>
        </div>
        <div className={`${styles.FirstDivMobileTop} items-center grid `}>
          <div className="grid px-4 md:w-3/4 lg:w-1/2 md:mx-auto">
            <p>Hello ,</p>
            <p className="py-2 text-2xl font-semibold">ADJH 73646</p>
          </div>

          <div className="flex place-content-center items-center justify-between  md:w-3/4 lg:w-1/2 md:mx-auto">
<div className="grid text-left px-4">
  <p className="font-semibold text-lg">Today's Tuesday</p>
  <p className="text-neutral-600">Dec 12, 2023</p>
</div>

<div className="px-4">
  <p className="font-normal ">20% Done</p>
</div>
          </div>
          <div className=" w-screen flex place-content-center items-center  md:w-3/4 lg:w-1/2 md:mx-auto ">
          <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={20} />
    </Box>

          </div>

        </div>
        <div className={`${styles.AllSessionsMobileDiv} grid items-center my-4`}>
         <div className={`${styles.SingleSessionDesktopDiv} grid`}>
        <div className=" flex items-center justify-between px-4 my-4">
        <div>
        <p className="font-medium"> Dr Buthia</p>
        </div>
        <div className="flex items-center">
         <p className="text-sm text-neutral-500 px-2">2days ago</p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center font-bold`}>
            <p><DoneIcon /></p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 1</p>
        </div>
         </div>

         <div className={`${styles.SingleSessionDesktopDiv} grid`}>
        <div className=" flex items-center justify-between px-4 my-4">
        <div>
        <p className="font-medium"> Dr Buthia</p>
        </div>
        <div className="flex items-center">
         <p className="text-sm text-neutral-500 px-2">2days ago</p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center font-bold`}>
            <p><DoneIcon /></p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 2</p>
        </div>
         </div>

         <div className={`${styles.SingleSessionDesktopDiv} grid`}>
        <div className=" flex items-center justify-between px-4 my-4">
        <div>
        <p className="font-medium"> Dr Buthia</p>
        </div>
        <div className="flex items-center">
         <p className="text-sm text-neutral-500 px-2">2days, 12hrs</p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center font-bold`}>
            <p><BsThreeDots /></p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 3</p>
        </div>
         </div>
         
        </div>
      </div>
    </div>
  )
}

export default Sessions;