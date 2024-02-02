"use client"

import { useSession } from "next-auth/react"
// import SessionData from "./session-data"
// import CustomLink from "./custom-link"


export default function Profile() {

  const { data: session, status } = useSession()
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Client Side Rendering Usage</h1>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          <div> {session?.user?.email} </div>
          <div> {session?.user?.image} </div>
          <div> {session?.user?.name} </div>
        </>
      )}
    </div>
  )
}