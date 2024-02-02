'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "antd"
import { GithubOutlined } from '@ant-design/icons';


export default function LoginBtn() {

  return (
    <Button icon={<GithubOutlined />} onClick={() => signIn()} />
  )
}