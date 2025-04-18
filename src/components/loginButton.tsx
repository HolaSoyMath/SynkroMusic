'use client'

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import Image from "next/image"

export default function LoginButton() {
  return (
    <Button
      className="w-full rounded-full bg-transparent border-1 border-white text-foreground cursor-pointer px-0 py-5 relative hover:bg-primary/20"
      onClick={() => signIn('spotify', { callbackUrl: '/home' })}
    >
      <Image
        src={'/spotify-logo.svg'}
        alt="Spotify Logo"
        width={30}
        height={30}
        className="absolute left-1.5"
      />
      <span className="uppercase text-md tracking-widest">
        Entrar com spotify
      </span>
    </Button>
  )
}
