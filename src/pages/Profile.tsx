import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/Navbar"

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-background/80 p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" placeholder="Tu dirección" />
            </div>
            
            <Button className="w-full">Guardar Cambios</Button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Profile
