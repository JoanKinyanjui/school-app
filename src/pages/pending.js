import ProgressTracker from '@/components/ProgressTracker';
import styles from '../styles/pending.module.css';
import {BiSearchAlt2} from 'react-icons/bi'
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Pending() {
  const [pendingSessions,setPendingSessions] = useState([]);
  const [status,setStatus] = useState();
  const getPendingSessions = async () =>{

  // const response = await fetch("https://school-app-backendurl.vercel.app/TherapySession",{
  const response = await fetch("http://localhost:5000/TherapySession",{
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      Authorization :`Bearer ${localStorage.getItem('token')}`
    }
  })
  // console.log(response)
  if(response.status == 201){
    const sessions = await response.json();
    const updatedSessions = sessions.reverse().map(session => {
      let number = 1;
      if(session.Status === "registration complete") {
        number = 1;
      } else if(session.Status === " payment complete") {
        number = 2;
      } else if(session.Status === "booking complete ") {
        number = 3;
      } else if(session.Status === "sessions complete") {
        number = 4;
      }
      return {
        ...session,
        number: session.number || number // check for duplication
      };
    });
    setPendingSessions(updatedSessions);
  //  console.log(pendingSessions)
  }else if(response.status == 500){
    const {Message} = response.json();
    console.log(Message);
  }
  }

  useEffect(()=>{
     getPendingSessions();
  },[])
  return (
  
    <>
       <div className={`${styles.SearchBarDiv}  w-full `}>
<div className='flex justify-between w-10/12 md:w-3/4 mx-auto items-center h-full' >
<Link href='/dashboard' className='flex w-full'>
  <p className={`${styles.fitBitName} flex pl-4 md:pl-12`}>Better You <span className={`${styles.Period}`}>.</span></p>
  </Link>
    <form className={`${styles.FormDiv} flex items-end py-4 bg-transparent`} >
        <label> <BiSearchAlt2 className='text-2xl text-green-600 mx-4' /></label>
        <input  type='text'  placeholder='St. Austin...' className={`${styles.SearchBarInputField} bg-transparent`} />
    </form>
</div>
    </div>
<div className={`${styles.SchoolsDiv}`}>
      {pendingSessions.map((single)=>(
        <Link href={`/progress?id=${single.AdmNo}`}  key={single._id} >
         <div className={`${styles.SchooLDiv} w-full justify-between flex items-center px-2 md:px-4 my-4`} key={single._id}>
         <div className={`${styles.SchoolProfile} flex justify-center items-center px-10 py-1 font-normal text-md md:text-xl`}>
         {single.AdmNo}
         </div>
          <div className={`${styles.StudentsName}`}>{single.Name}</div>
          <div className={`${styles.Monogram} px-4 py-2 text-white`}> 
          <ProgressTracker
         completedSteps={single.number}
        />
        </div>
         </div>
         </Link>
      ))}


    </div>

</>
  )
}

export default Pending ;