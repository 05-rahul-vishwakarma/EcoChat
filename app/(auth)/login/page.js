"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

function Login() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const res = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      if (res.status === 200) {
        router.push("/chats");
      }
      if (res.error) {
        alert("wrong credentials")
      }
     } catch (error) {
      alert(error.message)
     }
  };

  return (
    <main className='bg-[#49a39a] h-screen flex justify-center items-center ' >
      <main className='bg-[#fefefe] h-[90%] w-[340px] mr-auto ml-auto ' >
        <h1 className='mr-auto ml-auto w-full pt-8 pb-2 text-left px-4 font-bold text-[#49a39a]' >LOGIN</h1>
        <form onSubmit={""} >
          <div className='flex justify-center py-2 ' >
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}
              id="username" required placeholder='Username' className='border-2 w-[95%] p-1.5 rounded-md outline-[#49a39a] text-[.8rem]   ' />
          </div>

          <div className='flex justify-center py-2 ' >
            <input type="password" name="password" value={password}
              id="password" placeholder='Password' required className='border-2 w-[95%] p-1.5 rounded-md outline-[#49a39a] text-[.8rem]' onChange={(e) => setPassword(e.target.value)} />
          </div>


          <div className='flex justify-center py-2 ' >
            <button type='submit' className='border-2 w-[95%] p-2 rounded-md outline-[#49a39a] font-[500] text-[.8rem] bg-[#49a39a] text-[white] ' onClick={handleSubmit} >
              Login
            </button>
          </div>

          <p className='text-center text-[.8rem]  ' > have you not registered? <Link href={"/register"} className='text-[#49a39a] font-[600] ' > Register</Link> </p>
        </form>
        <h1 className='text-center my-1 ' >or</h1>
        {/* <div className='flex items-center bg-[#49a39a] w-[95%] mr-auto ml-auto text-center justify-center p-1.5 text-[white] text-[.8rem] font-[500] rounded-md ' >
          <Image src={"/register/facebook.png"} alt='facebook' width={25} height={25} className='mr-2 ' />
          Login With Facebook
        </div>
        <div className='flex items-center bg-[#49a39a] w-[95%] mr-auto ml-auto text-center justify-center p-1.5 my-2 text-[white] text-[.8rem] font-[500] rounded-md ' >
          <Image src={"/register/google.png"} alt='facebook' width={25} height={25} className='mr-2' />
          Login With Google
        </div> */}
      </main>
    </main>
  )
}

export default Login