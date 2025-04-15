import { Headphones } from 'lucide-react'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function LoginTemplate() {
  return (
    <div className="h-dvh w-full flex justify-center items-center">
      <Card className="px-28 py-28 border-none">
        <CardTitle className="flex justify-center px-0">
          <Headphones className="bg-icon-background text-white w-auto h-auto px-3 py-3 rounded-md" />
        </CardTitle>
        <CardContent className="flex flex-col items-center px-0 gap-2">
          <h1 className="text-white font-semibold text-3xl">Bem vindo!</h1>
          <p className="uppercase text-sm tracking-[.08em] text-nowrap">
            Conecte com a sua conta do spotify
          </p>
        </CardContent>
        <CardFooter className="w-full px-0 mt-4">
          <Link href={'/home'} className="w-full">
            <Button className="w-full rounded-full bg-transparent border-1 border-white text-foreground cursor-pointer px-0 py-5 relative hover:bg-primary/20">
              <Image
                src={'/spotify-logo.svg'}
                alt="Spotify Logo"
                width={30}
                height={30}
                className='absolute left-1.5'
              />
              <span className="uppercase text-md tracking-widest">
                Entrar com spotify
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
