// import { useAuth } from "@/hooks/useAuth"
import { useAuth } from "@/hooks/useAuth"
import { Outlet } from "react-router-dom"
import { Navigate } from "../Navigate"

export const PrivateRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()
    if (!user) return <Navigate to={redirect}/>

    return <Outlet />
}