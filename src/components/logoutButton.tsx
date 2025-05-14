'use client'

import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"

export default function LogoutButton() {

  function signOut() {
    Cookies.remove("spotifyAccessToken")
    window.location.href = "/"
  }

  return (
    <Button
      className="w-full rounded-4 bg-transparent text-background border-1 border-background cursor-pointer px-0 py-5 relative hover:bg-primary"
      onClick={() => signOut()}
    >
      <LogOut />
      <span className="uppercase text-md tracking-widest">Sair</span>
    </Button>
  )
}
