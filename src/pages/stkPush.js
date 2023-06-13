import { useState } from 'react';
import styles from '../styles/register.module.css' ;
import { useRouter } from 'next/router';

function StkPush() {
   const router = useRouter();
  
    
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
    let  id = router.query?.id;
      try {
       
        const response = await fetch('http://localhost:5000/Mpesa/initiate-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ PhoneNumber, Amount }),
        });
  
        if(response.status == 200){
          const {Message} = response.json();
          const updateResponse = await fetch(`http://localhost:5000/TherapySession/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ AdmNo: id ,Status:"payment completed" }), // Replace 'yourAdmNo' with the actual AdmNo and status info
      });

      if (updateResponse.status === 200) {
        console.log('Status updated successfully');
        router.push('/calendar');
      } else {
        const { Message } = await updateResponse.json();
        console.log(Message);
      }
          console.log(Message);
          router.push('/calendar');
        }else{
          const {Message} = response.json();
          console.log(Message);
        }
  
        console.log('Form submission successful');
      } catch (error) {
        // Handle any errors that occurred
        console.error(error);
      }
    };
  

  return (
    <div className='h-screen w-screen grid place-content-center items-center'>

        <div className={`${styles.BackgroundFormSTK} grid place-content-center items-center`}>
  <form className='grid  place-content-center'>
  <div className='mx-auto my-4'>
         <img src='https://developingtelecoms.com/images/stories/Company_Logos/m-pesa-600.jpg' className='w-[100px] h-[100px] '   />
             </div>
  <div className='flex py-2'>
    <div className={`${styles.LabelRegister}`}>
    <label className={`${styles.LabelPayment} text-left`} >Phone No :</label>
    </div>

    <input className={`${styles.RegisterInput}`} type='number' required value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  placeholder='07902....'/>
</div>

<div className='flex py-2'>
    <div className={`${styles.LabelRegister}`}>
    <label className={`${styles.LabelPayment} text-left`} >Amount :</label>
    </div>

    <input className={`${styles.RegisterInput}`} type='number' required placeholder='2500' value={Amount} onChange={(e) => setAmount(e.target.value)} />
</div>
  </form>

<div className='w-screen flex place-content-center py-4'>
<button  className={`${styles.ButtonFinish} mx-auto bg-green-300 px-4 py-2 my-6`} onClick={handleSubmit}>renderButton</button>
</div>
        </div>
    </div>
  )
}

export default StkPush;