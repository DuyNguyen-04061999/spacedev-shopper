import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config/path";
import { MainLayout } from "@/layouts/MainLayout";
import { lazy } from "react";
const Home = lazy(() => import('@/pages'))
const Page404 = lazy(() => import('@/pages/404'))

export const routers = [
    {
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                element: <PrivateRoute redirect="/" />,
                children: [],
            },
            {
                element: <GuestRoute redirect="/" />,
                children: []
            },

            {
                element: <Page404 />,
                path: '*'
            }
        ]
    }
]