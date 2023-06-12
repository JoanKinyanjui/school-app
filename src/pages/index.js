import Link from 'next/link';
import styles from '../styles/schools.module.css'
import {BiSearchAlt2} from 'react-icons/bi'
import { useEffect, useState } from 'react';

function Schools() {
  const [schools,setSchools] = useState();
  const[error,setError] = useState();

  const getSchools = async() => {
    // const response = await fetch("https://school-app-backendurl.vercel.app/school",{
      const response = await fetch("http://localhost:5000/school",{
    method: 'GET',
    headers:{
      'Content-Type':'application/json'
    }
  })
 console.log(response);
 if(response.status == 201){
  setSchools(await response.json());
  // setFilteredSchools(schools)
  console.log(schools)
 }else if(response.status ==500){
   setError(await response.json().message);
 }
  }



  // Search Schools
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  
      const filteredSchools = schools.filter((school) => {
        const schoolName = school.name.toLowerCase();
        return schoolName.includes(searchValue.toLowerCase());
      });
      setFilteredSchools(filteredSchools);
    
  };
  

  useEffect(()=>{
    getSchools()
   
  },[])

  useEffect(() => {
    setFilteredSchools(schools);
  }, [schools]);
  

  return (
<div className='w-screen h-screen'>
    <div className={`${styles.SearchBarDiv} flex items-center justify-between w-full `}>
    <div className='w-11/12 md:w-3/4 flex justify-between items-center mx-auto'>
    <Link href='/signup'>
      <p className={`${styles.SignUpButtonNav} flex text-sm md:text-md px-4 md:px-10 py-3`}>Sign Up</p>
      </Link>
    <form className={`${styles.FormDiv} flex items-end py-4 bg-transparent`} >
        <label> <BiSearchAlt2 className='text-2xl text-green-600 mx-4' /></label>
        <input  type="text"
        placeholder="Search by school name"
        value={searchTerm}
        onChange={handleSearch}
        className={`${styles.SearchBarInputField} bg-transparent`} />
    </form>
    </div>
    </div>
{filteredSchools && 
  <div className={`${styles.SchoolsDiv}  my-6`}>
    {filteredSchools.map((school)=>(
        <Link href='/login' key={school._id}>
        <div className={`${styles.SchooLDiv} w-full justify-between flex items-center px-2 md:px-4 my-4 md:my-6 py-2 `}>
         <div className={`${styles.SchoolProfile} flex justify-center items-center`}>
          <img  className={`${styles.LogoPic}`} src='https://images.pexels.com/photos/14164902/pexels-photo-14164902.jpeg?auto=compress&cs=tinysrgb&w=1600'/>
         </div>
          <div className='text-sm md:text-md uppercase' >{school.name}</div>
          <div className={`${styles.Monogram} px-2`}>{school.symbol}</div>
         </div>
        </Link>
    ))}
     <div className='w-full flex place-content-center py-4'>
      <p className='mx-auto'>{error}</p>
     </div>
     
    </div>}
</div>
  )
}

export default Schools;