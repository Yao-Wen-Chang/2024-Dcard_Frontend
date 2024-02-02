// "use client";
import React from 'react';
import LoginBtn from './components/LoginBtn';
import SignoutBtn from './components/SignoutBtn';
import PostList from './components/PostList';
import { auth } from '@/auth'


const LoginPage: React.FC = async() => {
  const session = await auth();
  console.log(session?.user)
  // console.log(session?.user)
  if (session) {
    return (
      <>
        { session.user?.name ? <PostList user={session.user?.name} /> : <PostList user="Default User" />}
        <SignoutBtn />
      </>
    );
  }
  return (
    <>
      <LoginBtn /> 
    </>

  ) 

};

export default LoginPage;