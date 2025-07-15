import { StoreProvider, useStores } from './stores/storeContext'
import { RouterProvider } from "react-router-dom"
import router from "./routes"
import { useEffect } from 'react'

function App() {
  const { themeStore } = useStores()
  
  useEffect(() => {
    themeStore.applyTheme()
  }, [themeStore.theme])

  return (
    <StoreProvider>
      <div className="flex flex-col min-h-screen">
        <RouterProvider router={router} />
      </div>
    </StoreProvider>
  )
}

export default App