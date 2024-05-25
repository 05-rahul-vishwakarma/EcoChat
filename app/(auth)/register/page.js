"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
// import { FaFacebook, FaGoogle } from "react-icons/fa";
import Image from 'next/image';




function Register() {
  const router = useRouter();
  
  const [credentails,updateCredentails] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleChange = (e) =>{
   e.preventDefault();
   const { name, value } = e.target;
   updateCredentails({
     ...credentails,
     [name]: value
   });
 
  }

  const register = async (e) =>{
    e.preventDefault();
    if (!credentails.username || !credentails.email || !credentails.password || !credentails.confirmPassword) {
      alert("some important field is missing")
    }else{
      try {
        let config = {
          method:"POST",
          contentType:"application/json",
          body:JSON.stringify({...credentails})
        }
        // let res = await fetch("api/auth/register",config);
        let res = await fetch ("api/register",config)
        res = await res.json();

        if (res.status) {
          alert(res.message)
        }
        if (res.status == 200) {
          router.push("/login")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className='bg-[#49a39a] h-screen flex justify-center items-center ' >
      <main className='bg-[#fefefe] h-[90%] w-[340px] mr-auto ml-auto ' >
        <h1 className='mr-auto ml-auto w-full pt-8 pb-2 text-left px-4 font-bold text-[#49a39a] ' >REGISTER</h1>
        <form onSubmit={register}  >
          <div className='flex justify-center py-2 ' >
            <input type="text" name="username" value={credentails.username}  id="username"  required placeholder='Username' className='border-2 w-[95%] p-1.5 rounded-md outline-[#49a39a] text-[.8rem]' onChange={handleChange} />
          </div>

          <div className='flex justify-center py-2 ' >
            <input type="email" name="email" id="email" value={credentails.email} required placeholder='Email' className='border-2 w-[95%] p-1.5 rounded-md outline-[#49a39a] text-[.8rem]' onChange={handleChange} />
          </div>

          <div className='flex justify-center py-2 ' >
            <input type="password" name="password" value={credentails.password} id="password" placeholder='Password' required className='border-2 w-[95%] p-1.5 rounded-md outline-[#49a39a] text-[.8rem]' onChange={handleChange} />
          </div>

          <div className='flex justify-center py-2 ' >
            <input type="password" name="confirmPassword" value={credentails.confirmPassword} id="confirmPassword" placeholder='Confirm password' required className='border-2 w-[95%] p-1.5 rounded-md outline-[#49a39a] text-[.8rem]' onChange={handleChange} />
          </div>

          <div className='flex justify-center py-2 ' >
            <button type='submit' className='border-2 w-[95%] p-2 rounded-md outline-[#49a39a] font-[500] text-[.8rem] bg-[#49a39a] text-[white] ' >
              Register
            </button>
          </div>

          <p className='text-center text-[.8rem]  ' >Already have an account? <Link href={"/login"} className='text-[#49a39a] font-[600] ' > Login</Link> </p>
        </form>
        <h1 className='text-center my-1 ' >or</h1>
        
        {/* <div className='flex items-center bg-[#49a39a] w-[95%] mr-auto ml-auto text-center justify-center p-1.5 rounded-md text-[white] text-[.8rem] font-[500] ' >
          <Image src={"/register/facebook.png"} alt='facebook' width={25} height={25} className='mr-2 ' />
          Login With Facebook
        </div> */}

        {/* <div className='flex items-center bg-[#49a39a] w-[95%] mr-auto ml-auto text-center justify-center p-1.5 rounded-md my-2 text-[white] text-[.8rem] font-[500] ' >
          <Image src={"/register/google.png"} alt='facebook' width={25} height={25} className='mr-2' />
          Login With Google
        </div> */}
        
      </main>
    </main>
  )
}

export default Register