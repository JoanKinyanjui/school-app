import { useState } from 'react';
import FaSchool from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from '../styles/Auth.module.css';
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage]= useState('');

  const onChangeEmail =(e)=>{
    setEmail(e.target.value);
}
const onChangePassword =(e)=>{
  setPassword(e.target.value);
}

const onHandleSubmit =async(e)=>{
  e.preventDefault();

  // Login Logic ...
  // const response = await fetch('https://school-app-backendurl.vercel.app/school/login',{
    const response = await fetch('http://localhost:5000/school/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,
        password
      }),
     });

  if(response.status == 200){
      const {success,token,Message,school} = await response.json();
     if(success){
      setMessage(Message);
      localStorage.setItem('token',token);
      localStorage.setItem('school',JSON.stringify(school));
      console.log(token,success,school);
      setPassword('');
      setEmail('');
      router.push('/dashboard');
     }
  }else if(response.status == 400){
      const {Message}=await  response.json();
      setMessage(Message)

  }
}

  return (
    <div className={`${styles.formcontainer} grid items-center`} >
    <div className={`${styles.formdiv}`}>
    <div className='grid w-full place-content-center'>
    <div><AccountCircleIcon style={{fontSize: "xxx-large", color:"green"}}/></div>
<p className='text-3xl mt-4'>Log In</p>
    </div>
<form onSubmit={onHandleSubmit} className='form'>
    <div className={`${styles.inputdiv} flex  items-center`}>
    <label className={`${styles.formlabel}`}>Email :</label>
    <input className={`${styles.input} ml-4`} type='email' required name="email"  value={email}  onChange={onChangeEmail} />
    </div>
    <div className={`${styles.inputdiv} flex  items-center`}>
    <label className={`${styles.formlabel}`} >Password :</label>
    <input className={`${styles.input} ml-4`} type="password" name='password' required  value={password} onChange={onChangePassword} />
    </div>
    <div className='flex place-content-center mt-2 text-slate-400'><p>No account yet  ? <Link href='/signup' className='text-blue-300 '>Sign up</Link></p></div>
   <div className='w-full flex place-content-center pt-8'>
   <input type='submit' value='lOGIN' className={`${styles.submitbutton} mx-auto`} />
   </div>
</form>

    </div>
      <div className='absolute bottom-0 w-screen mb-2flex place-content-center   '>
       <h3 className='mx-auto py-4'>{message} ...</h3>
    </div>

    </div>
  )
}

export default Login;