import styles from '../styles/singleTherapist.module.css';
import {RiStarSFill} from 'react-icons/ri';
import {TiTick} from 'react-icons/ti'

function SingleTherapist({therapist}) {
  return (
    <div className={`${styles.SingleTherapist}`} > 
   <img className={`${styles.singletherapistimg}`} src={therapist.url}/>

   <div className={`${styles.singletherapistabsolute}`}>
   </div>
   <div className={`${styles.singletherapistinfo} pb-2`}>
   <div className='flex justify-between'>
     <p className='flex'>
    <RiStarSFill className='text-green-600' />
    <RiStarSFill className='text-green-600' />
    <RiStarSFill className='text-green-600' />
    <RiStarSFill  className='text-green-600' />
    </p> 
    <p>Ksh {therapist.price}</p></div>
    <p>{therapist.name}</p>
    <p className='flex items-center'> <TiTick  className='text-green-600 '/>{therapist.specialization}..</p>
   </div>
    </div>
  )
}

export default SingleTherapist