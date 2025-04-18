import { Headphones } from 'lucide-react'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import LoginButton from '../loginButton'

export default function LoginTemplate() {
  return (
    <div className="h-full w-full flex justify-center items-center">
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
          <LoginButton />
        </CardFooter>
      </Card>
    </div>
  )
}
