import React from 'react';
import styles from '../styles/register.module.css' ;
import { useRouter } from 'next/router';

function StkPush() {
   const router = useRouter()
    const handlePayment =async()=>{
      router.push('/calendar');
    }
  return (
    <div className='h-screen w-screen grid place-content-center items-center'>
        <div>
  <form className='grid  place-content-center'>
  <div className='flex py-2'>
    <div className={`${styles.LabelRegister}`}>
    <label className={`${styles.LabelPayment} text-left`} >Phone No :</label>
    </div>

    <input className={`${styles.RegisterInput}`} type='number' required placeholder='07902....'/>
</div>

<div className='flex py-2'>
    <div className={`${styles.LabelRegister}`}>
    <label className={`${styles.LabelPayment} text-left`} >Amount :</label>
    </div>

    <input className={`${styles.RegisterInput}`} type='number' required placeholder='2500'/>
</div>
  </form>

<div className='w-screen flex place-content-center py-4'>
<button  className={`${styles.ButtonFinish} mx-auto bg-green-300 px-4 py-2 my-6`} onClick={handlePayment}>renderButton</button>
</div>
        </div>
    </div>
  )
}

export default StkPush;