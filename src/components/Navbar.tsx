import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet"
import { Menu, Home, ShoppingBag, User, Phone, Grid, X, History, Bell, HelpCircle, Settings, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeSwitcher from "./ui/ThemeSwitcher"
import { useStores } from "../stores/storeContext"
import { observer } from "mobx-react"
import { Badge } from "./ui/badge"
import { useCallback, memo } from "react"

// Componente memoizado para el input de búsqueda
const SearchInput = memo(({ value, onChange, className, placeholder }: {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <input
      type="text"
      placeholder={placeholder || "Buscar productos..."}
      value={value}
      onChange={handleChange}
      className={className}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  )
})

SearchInput.displayName = "SearchInput"

// Componente memoizado para los enlaces de navegación
const NavLink = memo(({ to, children, onClick }: {
  to: string
  children: React.ReactNode
  onClick?: () => void
}) => (
  <Link to={to} onClick={onClick} className="flex items-center">
    {children}
  </Link>
))

NavLink.displayName = "NavLink"

const Navbar = observer(() => {
  const { cartStore, productStore } = useStores()

  const handleSearchChange = useCallback((value: string) => {
    productStore.setSearchQuery(value)
  }, [productStore])

  return (
    <nav className="sticky top-0 z-50 bg-background/80 dark:bg-background/90 backdrop-blur-sm border-b border-border dark:border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xs md:text-xl font-bold text-foreground">
              <span className="text-primary">Platos</span>Ya
            </h1>
          </Link>

          {/* Input de búsqueda - Solo en desktop */}
          <div className="flex-1 px-4 hidden md:block">
            <SearchInput
              value={productStore.searchQuery}
              onChange={handleSearchChange}
              className="text-black dark:text-white w-full max-w-md mx-auto block border rounded px-3 py-1
                         text-sm placeholder-muted-foreground
                         focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Buscar productos..."
            />
          </div>

          {/* Íconos + Menú */}
          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/">
                <Button variant="ghost" size="icon" aria-label="Inicio">
                  <Home className="h-4 w-4" />
                </Button>
              </NavLink>
              <NavLink to="/catalog">
                <Button variant="ghost" size="icon" aria-label="Catálogo">
                  <Grid className="h-4 w-4" />
                </Button>
              </NavLink>
              <NavLink to="/cart">
                <Button variant="ghost" size="icon" className="relative" aria-label="Carrito">
                  <ShoppingBag className="h-4 w-4" />
                  {cartStore.itemCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 px-1.5 text-xs">
                      {cartStore.itemCount}
                    </Badge>
                  )}
                </Button>
              </NavLink>
              <NavLink to="/contact">
                <Button variant="ghost" size="icon" aria-label="Contacto">
                  <Phone className="h-4 w-4" />
                </Button>
              </NavLink>
              <NavLink to="/profile">
                <Button variant="ghost" size="icon" aria-label="Perfil">
                  <User className="h-4 w-4" />
                </Button>
              </NavLink>
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              {/* boton para abrir nav */}
              <div className="md:hidden">
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Menú"
                    className="fixed top-4 right-4 z-50 shadow-lg bg-background/80 dark:bg-background/90 hover:bg-background dark:hover:bg-background"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent
                side="right"
                className="w-full max-w-sm p-0 bg-background text-foreground border-0 dark:bg-background dark:text-foreground"
              >
                <div className="flex flex-col h-full">
                  {/* Header con avatar y saludo */}
                  <div className="relative p-6 pb-4">


                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-foreground">Hello,</h2>
                        <p className="text-sm text-muted-foreground">Usuario</p>
                      </div>
                    </div>

                    {/* Theme Switcher */}
                    <ThemeSwitcher />
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 px-6">
                    <div className="space-y-1">
                      <SheetClose asChild>
                        <NavLink to="/">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <Home className="h-5 w-5 text-foreground" />
                            <span>Home</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/profile">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <User className="h-5 w-5 text-foreground" />
                            <span>Perfil</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/history">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <History className="h-5 w-5 text-foreground" />
                            <span>History</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/catalog">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <Grid className="h-5 w-5 text-foreground" />
                            <span>Catálogo</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/notifications">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <Bell className="h-5 w-5 text-foreground" />
                            <span>Notifications</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/help">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <HelpCircle className="h-5 w-5 text-foreground" />
                            <span>Help</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/settings">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                            <Settings className="h-5 w-5 text-foreground" />
                            <span>Setting</span>
                          </Button>
                        </NavLink>
                      </SheetClose>

                      <SheetClose asChild>
                        <NavLink to="/cart">
                          <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg relative">
                            <ShoppingBag className="h-5 w-5 text-foreground" />
                            <span>Carrito</span>
                            {cartStore.itemCount > 0 && (
                              <Badge variant="destructive" className="ml-auto h-5 px-2 text-xs">
                                {cartStore.itemCount}
                              </Badge>
                            )}
                          </Button>
                        </NavLink>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="p-6 pt-4 border-t border-border dark:border-border">
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-foreground hover:bg-muted rounded-lg">
                        <LogOut className="h-5 w-5 text-foreground" />
                        <span>Logout</span>
                      </Button>
                    </SheetClose>
                  </div>
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