import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="w-full mt-16">
      <Card className="bg-background border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} PlatosYa. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-sm text-foreground">
            <Link to="/catalog" className="hover:text-primary transition-colors">Catálogo</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Acerca de</Link>
          </div>
        </div>
      </Card>
    </footer>
  )
}

export default Footer
