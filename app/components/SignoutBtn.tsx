"use client";
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React from 'react'

const SignoutBtn = () => {
  return (
    <button
      onClick={() => {
        signOut();
        redirect("http://localhost:3000/")
      }}
    >
      Sign Out     
    </button>
  )
}

export default SignoutBtn