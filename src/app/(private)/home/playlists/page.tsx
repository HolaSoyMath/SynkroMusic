import HomeTemplate from '@/components/template/Home'
import { HomeProvider } from '@/context/HomeContext'

export default async function HomePage() {
  return (
    <HomeProvider>
      <HomeTemplate />
    </HomeProvider>
  )
}
