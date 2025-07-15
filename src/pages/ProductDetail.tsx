import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStores } from '@/stores/storeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ChevronLeft } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';

const ProductDetail = observer(() => {
  const { productStore, cartStore } = useStores();
  const { id } = useParams<{ id: string }>();
  const product = productStore.products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <Navbar />
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-foreground">Producto no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      
      {/* Back button */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold ml-4">Detalles del Producto</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-video w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">{product.name}</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="text-sm text-muted-foreground">COP</span>
          </div>

          <p className="text-lg text-muted-foreground line-clamp-6">{product.description}</p>

          {/* Product Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Características</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-muted-foreground">Material: {product.category}</li>
              <li className="text-muted-foreground">Tamaño: 25cm de diámetro</li>
              <li className="text-muted-foreground">Color: {product.name.split(' ')[0]}</li>
              <li className="text-muted-foreground">Uso: Diario</li>
              <li className="text-muted-foreground">Garantía: 1 año</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1"
              onClick={() => cartStore.addItem(product.id, product.name, product.price)}
            >
              {cartStore.items.some(item => item.id === product.id) ? (
                <>
                  <span className="mr-2">✓</span>
                  En Carrito
                </>
              ) : (
                <>
                  <span className="mr-2">+</span>
                  Agregar al Carrito
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Implementar funcionalidad de compra
                alert('¡Funcionalidad de compra en desarrollo!');
              }}
            >
              Comprar Ahora
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Información de Entrega</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <span className="font-medium">Envío Gratuito:</span> En pedidos superiores a $100,000
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Tiempo de Entrega:</span> 2-3 días hábiles
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Retorno:</span> 30 días para devoluciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetail;
