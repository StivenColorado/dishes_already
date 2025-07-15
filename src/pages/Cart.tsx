import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { observer } from "mobx-react"
import { useStores } from "@/stores/storeContext"
import Navbar from "@/components/Navbar"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

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
                <Link to={`/product/${item.id}`} key={item.id}>
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">${item.price}</p>
                      </div>
                        <Button
                        className="dark:text-red-500 text-red-600"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          cartStore.removeItem(item.id)
                          toast.success('Producto eliminado del carrito')
                        }}
                        >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        </Button>
                    </div>
                  </Card>
                </Link>
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
