import { useQuery } from "@/hooks/useQuery"

export const withUseQuery = (queryConfig, Component) => {
    return () => {
        const query = useQuery(queryConfig)
        return <Component query={query}/>
    }
}