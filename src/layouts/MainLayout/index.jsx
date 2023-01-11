import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {


  return (
    <>
      <Header />
      <Suspense fallback={<div></div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}
