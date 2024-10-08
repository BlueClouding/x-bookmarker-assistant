'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LoginButton() {
    return (
        <Button onClick={() => signIn("twitter")}>
            Sign in with Twitter
        </Button>
    )
}