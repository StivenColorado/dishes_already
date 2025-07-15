import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, Home, ShoppingBag, User, Phone, Grid } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeSwitcher from "./ui/ThemeSwitcher"
import { useStores } from "../stores/storeContext"
import { observer } from "mobx-react"
import { Badge } from "./ui/badge"


const Navbar = observer(() => {
  const { themeStore, cartStore } = useStores()

  return (
    <nav className="sticky w-full  top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">
              <span className="text-primary">Platos</span>Ya
            </h1>
          </div>

          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm">
              <div className="flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => themeStore.toggleTheme()}
                >
                  {themeStore.theme === "light" ? "🌙" : "☀️"}
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Button variant="ghost" className="justify-start w-full gap-2">
                  <Home className="h-4 w-4" />
                  Inicio
                </Button>
                <Button variant="ghost" className="justify-start w-full gap-2">
                  <Grid className="h-4 w-4" />
                  Catálogo
                </Button>
                <Button variant="ghost" className="justify-start w-full gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Carrito
                </Button>
                <Button variant="ghost" className="justify-start w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Contacto
                </Button>
                <Button variant="ghost" className="justify-start w-full gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </Button>
                <ThemeSwitcher />
              </div>
            </SheetContent>
          </Sheet>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center justify-end gap-2">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/catalog" className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Grid className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/cart" className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                  <ShoppingBag className="h-4 w-4" />
                  <Badge variant="destructive" className="ml-1 h-4 px-1.5 text-xs absolute top-0 right-0">
                    {cartStore.itemCount}
                  </Badge>
                </Button>
              </Link>
              <Link to="/contact" className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/profile" className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
})

export default Navbar
