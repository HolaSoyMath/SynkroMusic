import LoginTemplate from '@/components/template/Login'
import { HomeProvider } from '@/context/HomeContext'

export default function Home() {
  return (
    <HomeProvider>
      <LoginTemplate />
    </HomeProvider>
  )
}
