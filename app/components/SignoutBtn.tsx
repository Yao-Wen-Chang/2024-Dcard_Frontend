"use client";
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React from 'react'

const SignoutBtn = () => {
  const redirectURL = process.env.NODE_ENV === 'production' ? 'https://2024-dcard-frontend.vercel.app/' : 'http://localhost:3000/';
  
  return (
    <button
      onClick={() => {
        signOut();
        redirect(redirectURL);
      }}
    >
      Sign Out     
    </button>
  )
}

export default SignoutBtn