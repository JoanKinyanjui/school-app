import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from '../styles/register.module.css' 
import SingleTherapist from '@/components/SingleTherapist';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import styles from '../styles/Completed.module.css';
import {CgClose} from 'react-icons/cg'
import { useEffect, useState } from 'react';
import { therapists } from '@/components/therapists';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

function Register({onClose}) {
  const router = useRouter();
  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };


  const [sort, setSort] = useState('');

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };


  const [isSelected,setIsSelected] = useState();

  function handleClick(id) {
    setIsSelected(prev => prev === id ? null : id);
    console.log(isSelected)

  }
  
const [Name,setName] =useState('');
const [AdmNo,setAdmNo] = useState('');
const [inputMessage,setInputMessage] = useState('');


  async function registerNewSession(){
   
    if(!isSelected && isSelected == undefined){
       setInputMessage('Choose a therapist !!');
      return;
    }
    if(AdmNo == '' ||Name == ''){
        setInputMessage('Fill in all the input fields !!');
        return;
    }

    const response = await fetch("http://localhost:5000/TherapySession",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      Authorization :`Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ AdmNo, Name, therapistId: isSelected })
    })
    if(response.status == 201){
      const {Message} = response.json();
      console.log(Message);
      router.push('/pending');
    }else{
      const {Message} = response.json();
      console.log(Message);
    }
  }

  return (
    <div className={`${styles.AllDivSelect}`} >

<div className={`${styles.CancelDiv} flex place-content-end pt-4 px-4 `}>
 <button onClick={onClose} ><CgClose className='text-2xl md:text-3xl text-green-600' /></button>
</div>


    <form className={`${styles.RegisterDiv} grid place-content-center items-center`}>
        <div className='flex py-4'>
        <div className={`${styles.LabelRegister}`}>
           <label >Admin No :</label>
           </div>
            <input  type='number' required className={`${styles.RegisterInput} py-2`} name='AdmNo' value={AdmNo} onChange={(e)=>{setAdmNo(e.target.value)}} />
        </div>

        <div className='flex'>
           <div className={`${styles.LabelRegister}`}>
           <label >Name :</label>
           </div>
            <input  type='text' required className={`${styles.RegisterInput} py-2`} name='name' value={Name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
    </form>
    <div className={`${styles.SerachTherapistDiv}`}>

    <div className='flex'>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={gender}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value='female'>Female</MenuItem>
    <MenuItem value='male'>Male</MenuItem>
    <MenuItem value='any'>Any</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sort}
  Genderbel="Age"
    onChange={handleSortChange}
  >
    <MenuItem value='recommended'>Recommended</MenuItem>
    <MenuItem value='low'>Fee Low to High</MenuItem>
    <MenuItem value='high'>Fee High to Low</MenuItem>
  </Select>
</FormControl>
    </div>
    </div>
    <div className='w-full flex place-content-center'>
      <p className='mx-auto text-red-400'>{inputMessage}</p>
    </div>

    <div className='px-4 py-8'>
 <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} style={{justifyContent: 'center', alignItems: 'center'}}>
        {therapists.map((therapist)=>(
          <Grid item xs={6} md={4} lg={3} key={therapist.id} >
          <Item  className={` ${isSelected === therapist.id ? styles.selected : ''}`} onClick={()=>handleClick(therapist.id)}><SingleTherapist therapist={therapist} /></Item>
        </Grid>
        ))}

        </Grid>
    </Box>
  
    </div>

<div className={`${styles.FinishDiv} flex place-content-center `}>
  <button className={`${styles.ButtonFinish}`} onClick={registerNewSession}>Finish</button>
</div>
    </div>
  )
}

export default Register;