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
import { useRouter } from "next/router";


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
  const router = useRouter();
  const {id} = router.query;
  console.log(id);

 //Fetch appointments of this admno ....
 const [appointments, setAppointments] = useState([]); 

 useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const admno = id; // Replace with the actual admno
      const response = await fetch(`http://localhost:5000/TherapySession/${admno}`);
      const appointmentsData = await response.json();
      setAppointments(appointmentsData);
      console.log(appointmentsData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchAppointments();
}, []);


// percentage
let percentage;
if(appointments){
percentage = 100/appointments.total;
console.log(percentage);
}

// convert Date
function convertDate(dateString) {
  const date = new Date(dateString);
  const convertedDate = date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return convertedDate;
}

//  Get day
const today = new Date();
// Get the day of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeek = daysOfWeek[today.getDay()];

// Get the date, month, and year
const date = today.getDate();
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = monthsOfYear[today.getMonth()];
const year = today.getFullYear();

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
            <p className="py-2 text-2xl font-semibold">ADJH {id}</p>
          </div>

          <div className="flex place-content-center items-center justify-between">
<div className="grid text-left px-4">
  <p className="font-semibold text-lg"> {` Today's ${dayOfWeek}`}</p>
  <p className="text-neutral-600">{` ${month} ${date}, ${year}`}</p>
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
        {appointments.map((item)=>(
         <div className={`${styles.SingleSessionMobileDiv} grid`}> 
        <div className=" flex items-center justify-between px-4 my-4">
        {/* <div>
        <p className="font-medium"> Dr Buthia</p>
        </div> */}
        <div className="flex items-center">
         <p className="text-sm text-neutral-800 px-2"> {convertDate(item.appointments[0].date)} </p>
         <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center text-[10px]`}>
            <p> {item.appointments[0].status} </p>
         </div>
        </div>
        </div>
        <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
          <p className="text-white"> 1</p>
        </div>
         </div>
         
         ))}
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
            <p className="py-2 text-2xl font-semibold">ADJH {id}</p>
          </div>

          <div className="flex place-content-center items-center justify-between  md:w-3/4 lg:w-1/2 md:mx-auto">
<div className="grid text-left px-4">
  <p className="font-semibold text-lg">{` Today's ${dayOfWeek}`}</p>
  <p className="text-neutral-600">{` ${month} ${date} ,${year}`}</p>
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
        {appointments.map((item)=>(
           <div className={`${styles.SingleSessionDesktopDiv} grid`}>
           <div className=" flex items-center justify-between px-4 my-4">
           <div>
           <p className="font-medium"> Dr Buthia</p>
           </div>
           <div className="flex items-center">
            <p className="text-sm text-neutral-800 px-2">{convertDate(item.appointments[0].date)} </p>
            <div className={`${styles.doneCircleMobile} flex  items-center text-white place-content-center text-[10px]`}>
               <p>{item.appointments[0].status}</p>
            </div>
           </div>
           </div>
           <div className={`${styles.AnotherBigBadgeNumberMobile} flex place-content-center items-center`}>
             <p className="text-white"> 1</p>
           </div>
            </div>
        ))}
         
        </div>
      </div>
    </div>
  )
}

export default Sessions;