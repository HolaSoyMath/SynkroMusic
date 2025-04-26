import HomeTemplate from '@/components/template/Home'
import { HomeProvider } from '@/context/HomeContext'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <HomeProvider>
      <HomeTemplate />
    </HomeProvider>
  )
}
