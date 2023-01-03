import { useRoutes } from "react-router-dom"
import { routers } from "./routers"
import { Suspense } from "react"
import "@/assets/css/tailwind.css"
import { message } from "antd"
message.config({
  maxCount: 3
})

function App() {
  const element = useRoutes(routers)
  return (
    <Suspense fallback={<div>App Loading....</div>}>
      {element}
    </Suspense>
  )
}

export default App
