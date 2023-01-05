// import { useAuth } from "@/hooks/useAuth"
import { useAuth } from "@/hooks/useAuth"
import { Outlet, useLocation } from "react-router-dom"
import { Navigate } from "../Navigate"

export const GuestRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()
    const { state } = useLocation()
    if (user) return <Navigate to={state?.redirect || redirect}/> 

    return <Outlet />
}