import { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "@/stores/storeContext"
import { Link } from 'react-router-dom'
import { formatPrice } from '@/utils/formatPrice'
import Navbar from "@/components/Navbar"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Catalog = observer(() => {
  const { productStore, cartStore } = useStores()
  const products = productStore.getAllProducts()

  useEffect(() => {
    productStore.fetchProducts()
  }, [])

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
        
        {productStore.loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : productStore.error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error: {productStore.error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                    <Button
                      variant="default"
                      onClick={(e) => {
                        e.preventDefault();
                        cartStore.addItem(product.id, product.name, product.price);
                      }}
                    >
                      {cartStore.items.some(item => item.id === product.id) ? 'En Carrito' : 'Agregar al Carrito'}
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
})

export default Catalog
