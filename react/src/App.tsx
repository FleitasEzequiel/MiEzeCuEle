import { useEffect } from "react"
import { SidebarProvider,SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/appComponents/AppSideBar"
function App() {

  return (
    <>
    <SidebarProvider>
      <AppSidebar></AppSidebar>
      <SidebarTrigger/>
    </SidebarProvider>
    </>
  )
}

export default App
