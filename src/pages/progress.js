import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import StepContent from '@mui/material/StepContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import styles from '../styles/progress.module.css';
import PaymentIcon from '@mui/icons-material/Payment';
import EventIcon from '@mui/icons-material/Event';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


const steps = [
  {
    key: 1,
    label: 'Registration',
    path: '',
    icon: PaymentIcon,
  },
  {
    key: 2,
    label: 'Payment',
    path: '/stkPush',
    icon: PaymentIcon,
  },
  {
    key: 3,
    label: 'Appointment Booking',
    path: '/calendar',
    icon: EventIcon,
  },
  {
    key: 4,
    label: 'Sessions Complete',
    path: '/sessions',
    icon: AssignmentTurnedInIcon,
  },
];



function Progress() {
    const router = useRouter()
  const [currentStatus,setCurrentStatus] = useState();
  const [stage,setStage] = useState(0);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

 const getStatusOfStudent = async(id) =>{
    const response = await fetch(`https://school-app-backendurl.vercel.app/TherapySession/getStatus/${id}`,{
        method: 'GET',
        headers:{
          'Content-Type':'application/json',
          Authorization :`Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 201) {
        const status = await response.json();
        setCurrentStatus(status);
    
        if (status === 'registration complete') {
          setStage(1);
        } else if (status === 'payment complete') {
          setStage(2);
        } else if (status === 'booking complete') {
          setStage(3);
        } else if (status === 'sessions complete') {
          setStage(4);
        }
        console.log(status);
      }
    

    
 }
let id;
 useEffect(()=>{
    console.log(router.query)
     id = router.query?.id;
    console.log(id)
    if(id){
        getStatusOfStudent(id);
    }
 },[])
    
  return (
    <div className={`${styles.AllProgressPage}`}>
              <div className={`${styles.NavMobileAppointment} px-4 flex justify-between items-center py-2`}>
      <Link  href='/pending'>
      <div className='font-medium text-green-600 px-2'><ArrowBackIosIcon /></div>
      </Link>
    </div>
    <div sx={{ width: '100%' }} className='hidden items-center h-screen md:grid'>
      <Stepper activeStep={stage} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.key}>
           <Link href={{ pathname: `${step.path}`, query: router.query }}>
              <StepLabel
                // StepIconComponent={step.icon}
                StepIconProps={{ style: { color: '#50C878' } }}
              >
                {step.label}
              </StepLabel>
            </Link>
          </Step>
        ))}
      </Stepper>
    </div>


<div className='w-screen place-content-center items-center h-screen justify-center grid md:hidden'>
      <Stepper activeStep={stage} orientation="vertical" className='mx-auto'>
        {steps.map((step, index) => (
          <Step key={step.id}>
            <Link href={{ pathname: `${step.path}`, query: router.query }}>
            <StepLabel StepIconProps={{ style: { color: '#50C878' } }}>
              {step.label}
            </StepLabel>
            </Link>
          </Step>
        ))}
      </Stepper>
    </div>


  </div>
  

  )
}

export default Progress;