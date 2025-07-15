import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, Home, ShoppingBag, User, Phone, Grid } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeSwitcher from "./ui/ThemeSwitcher"
import { useStores } from "../stores/storeContext"
import { observer } from "mobx-react"
import { Badge } from "./ui/badge"

const Navbar = observer(() => {
  const { themeStore, cartStore, productStore } = useStores()

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xs md:text-xl font-bold text-foreground">
              <span className="text-primary">Platos</span>Ya
            </h1>
          </Link>

          {/* Input de búsqueda */}
          <div className="flex-1 px-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={productStore.searchQuery}
              onChange={e => productStore.setSearchQuery(e.target.value)}
              className="text-black dark:text-white w-full max-w-md mx-auto block border rounded px-3 py-1
                         text-sm placeholder-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Íconos + Menú */}
          <div className="flex items-center gap-2">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <Button variant="ghost" size="icon"><Home className="h-4 w-4" /></Button>
              </Link>
              <Link to="/catalog" className="flex items-center">
                <Button variant="ghost" size="icon"><Grid className="h-4 w-4" /></Button>
              </Link>
              <Link to="/cart" className="flex items-center relative">
                <Button variant="ghost" size="icon">
                  <ShoppingBag className="h-4 w-4" />
                  {cartStore.itemCount > 0 && (
                    <Badge variant="destructive" className="absolute top-0 right-0 h-4 px-1.5 text-xs">
                      {cartStore.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/contact" className="flex items-center">
                <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
              </Link>
              <Link to="/profile" className="flex items-center">
                <Button variant="ghost" size="icon"><User className="h-4 w-4" /></Button>
              </Link>
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                {/* Dentro del sheet puedes repetir el input si quieres */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={productStore.searchQuery}
                    onChange={e => productStore.setSearchQuery(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>
                {/* Solo muestra ThemeSwitcher, elimina el botón duplicado */}
                <div className="flex justify-end mb-4">
                  <ThemeSwitcher />
                </div>
                <div className="flex flex-col gap-4">
                  <Link to="/"><Button variant="ghost" className="justify-start w-full gap-2"><Home className="h-4 w-4" />Inicio</Button></Link>
                  <Link to="/catalog"><Button variant="ghost" className="justify-start w-full gap-2"><Grid className="h-4 w-4" />Catálogo</Button></Link>
                  <Link to="/cart"><Button variant="ghost" className="justify-start w-full gap-2"><ShoppingBag className="h-4 w-4" />Carrito</Button></Link>
                  <Link to="/contact"><Button variant="ghost" className="justify-start w-full gap-2"><Phone className="h-4 w-4" />Contacto</Button></Link>
                  <Link to="/profile"><Button variant="ghost" className="justify-start w-full gap-2"><User className="h-4 w-4" />Perfil</Button></Link>
                  {/* Elimina ThemeSwitcher aquí para evitar duplicado */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
})

export default Navbar
