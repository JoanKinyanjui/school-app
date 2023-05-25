import { useState } from "react";
import styles from '../styles/Auth.module.css';
// import FaSchool from '@mui/icons-material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "next/link";
import { useRouter } from "next/router";


function Signup() {
    const router = useRouter();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [symbol,setSymbol] = useState('');
    const [error,setError]= useState('');

const onChangename =(e)=>{
    setName(e.target.value);
    generateSymbol();
    }
const onChangeEmail =(e)=>{
          setEmail(e.target.value);
    }
const onChangePassword =(e)=>{
        setPassword(e.target.value);
    }
const onChangeConfirmPassword =(e)=>{
      setConfirmPassword(e.target.value);
  }
//   const onChangeMonogram =(e)=>{
//     setSymbol(e.target.value);
// }
function generateSymbol() {
  const words = name.trim().split(" ");
  let symbol = "";
  for (let i = 0; i < words.length; i++) {
    symbol += String.fromCharCode(words[i].charCodeAt(0) + i);
  }
  console.log(symbol);
  setSymbol(symbol);
}

  const onHandleSubmit =async(e)=>{
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } 
    e.preventDefault('');

   //Register School...
const response = await fetch('https://school-app-backendurl.vercel.app/school/signup',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name,
      symbol,
      email,
      password
    }),
   });
if(response.status == 200){
  const {success,Message} = await response.json();
   if(success){
    setName('');
    setPassword('');
    setEmail('');
    setConfirmPassword('')
    setSymbol('')
    router.push("/login");
   }
  console.log('success')
}else if(response.success == false){
   const {Message} = await response.json();
      if (errors.password){
       setError(errors.password)
      }else if(errors.name){
       setError(errors.name)
      }else if(errors.email){
       setError(errors.email)
      }else{
        setError('Something went wrong,Try signing up later')
      }
  console.log('there is an error')
}


    }
  return (
    
    <div className={`${styles.formcontainer} flex items-center relative`} >
    <div className={`${styles.formdiv}`}>
    <div className='grid w-full place-content-center '>
    <div><AccountCircleIcon style={{fontSize: "xxx-large", color:"green"}}/></div>
<p className='text-3xl mt-4'>Sign Up</p>
    </div>
<form onSubmit={onHandleSubmit} className='form'>
<div className={`${styles.inputdiv} flex place-content-between items-center`}>
    <label className={`${styles.formlabel}`} >School Name :</label>
    <input className={`${styles.input}`} type='text'  required name="name" value={name} onChange={onChangename} />
    </div>
    <div className={`${styles.inputdiv} flex place-content-between items-center`}>
    <label className={`${styles.formlabel}`} >Monogram :</label>
    <input className={`${styles.input}`} type='text'  required name="symbol" id="symbol" value={symbol} readOnly />
    </div>
    <div className={`${styles.inputdiv} flex place-content-between items-center`}>
    <label  className={`${styles.formlabel}`} >Email :</label>
    <input className={`${styles.input}`} type='email' required name="email"  value={email}  onChange={onChangeEmail} />
    </div>
    <div className={`${styles.inputdiv} flex place-content-between items-center`}>
    <label className={`${styles.formlabel}`}> Password :</label>
    <input className={`${styles.input}`} type="password" name='password' required  value={password} onChange={onChangePassword} />
    </div>
    <div className={`${styles.inputdiv} flex place-content-between items-center`}>
    <label className={`${styles.formlabel}`}>Confirm Password :</label>
    <input className={`${styles.input}`} type="password" name='confirmPassword' required  value={confirmPassword} onChange={onChangeConfirmPassword} />
    </div>
    <div className='flex place-content-center mt-2 text-slate-400'><p>Already have an account  ? <Link href='/login' className='text-blue-300 '>SignUp</Link></p></div>

    <div className='w-full flex place-content-center pt-8'>
   <input type='submit' value='SIGN UP' className={`${styles.submitbutton} mx-auto`} />
   </div>
</form>

    </div>
    <div className='absolute bottom-0 w-screen mb-2 flex place-content-center'>
       <h3 className="text-black mx-auto py-4">{error}</h3>
    </div>

    </div>
  )
}

export default Signup;