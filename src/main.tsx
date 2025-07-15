import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { StoreProvider } from "./stores/storeContext"
import "../i18n" // Importa la configuración de i18n

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)
