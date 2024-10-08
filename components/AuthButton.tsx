"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { TwitterIcon } from 'lucide-react'

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <p>Welcome, {session.user?.name}</p>
        <Button onClick={() => signOut()} variant="outline">Sign out</Button>
      </div>
    )
  }
  return (
    <Button onClick={() => signIn('twitter')} className="bg-blue-400 hover:bg-blue-500">
      <TwitterIcon className="mr-2 h-4 w-4" />
      Sign in with Twitter
    </Button>
  )
}