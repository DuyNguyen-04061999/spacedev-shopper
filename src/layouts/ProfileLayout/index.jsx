import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const ProfileLayout = () => {
  return (
    <Suspense fallback={<div>ProfileLayout loading....</div>}>
        <Outlet />
    </Suspense>
  )
}
