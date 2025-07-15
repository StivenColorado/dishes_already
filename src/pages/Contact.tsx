import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/Navbar"

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Contáctanos</h1>
      
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Tu nombre" />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" />
          </div>
          
          <div>
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" placeholder="Escribe tu mensaje" />
          </div>
          
          <Button type="submit" className="w-full">
            Enviar Mensaje
          </Button>
        </form>
      </div>
      </div>
    </>
  )
}

export default Contact
