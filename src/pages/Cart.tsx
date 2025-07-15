import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CartStore } from "@/stores/cartStore"
import { observer } from "mobx-react"
import { useStores } from "@/stores/storeContext"
import Navbar from "@/components/Navbar"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Cart = observer(() => {
  const { cartStore } = useStores()
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Carrito</h1>
      
      {cartStore.items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Tu carrito está vacío</p>
          <Button className="mt-4" onClick={() => navigate('/catalog')}>Ver Catálogo</Button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {cartStore.items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      cartStore.removeItem(item.id)
                      toast.success('Producto eliminado del carrito')
                    }}
                  >
                    ❌
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button className="w-full md:w-auto">Proceder al Pago</Button>
          </div>
        </div>
      )}
      </div>
    </>
  )
})

export default Cart
