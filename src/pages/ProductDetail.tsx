import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStores } from '@/stores/storeContext';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ChevronLeft } from 'lucide-react'; 
import { formatPrice } from '@/utils/formatPrice';
import { useTranslation } from "react-i18next";


const ProductDetail = observer(() => {
  const { t } = useTranslation();
  const { productStore, cartStore } = useStores();
  const { id } = useParams<{ id: string }>();
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (productStore.products.length === 0 && !productStore.loading) {
      setLoadingProducts(true);
      const fetch = productStore.fetchProducts();
      // Si fetchProducts retorna una promesa (por flow), espera a que termine
      if (fetch && typeof fetch.then === 'function') {
        fetch.finally(() => setLoadingProducts(false));
      } else {
        setLoadingProducts(false);
      }
    }
  }, [productStore]);

  if (!id) {
    return <div>{t("productDetails.error")}</div>;
  }

  const product = productStore.getProductById(id);

  if (productStore.loading || loadingProducts) {
    return (
      <div className="container mx-auto py-8">
        <Navbar />
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-foreground">{t("productDetails.loading")}</h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <Navbar />
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-foreground">{t("productDetails.error")}</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-8 ">

        {/* Back button */}
        <div className="flex items-center mb-8">
          <Button
            className='bg-gray-100'
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold ml-4">{t("productDetails.title")}</h1>
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
              <h3 className="text-xl font-semibold text-foreground">{t("productDetails.characteristics")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-muted-foreground">Material: {product.category}</li>
                <li className="text-muted-foreground">Tamaño: {product.size}</li>
                <li className="text-muted-foreground">Color: {product.name.split(' ')[0]}</li>
                <li className="text-muted-foreground">Uso: {product.use ? product.use : t("productDetails.no_use")}</li>
                <li className="text-muted-foreground">Garantía: {product.warranty}</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 text-black dark:text-white dark:bg-green-400 bg-green-400"
                onClick={() => cartStore.addItem(product.id, product.name, product.price)}
              >
                {cartStore.items.some(item => item.id === product.id) ? (
                  <>
                    <span className="mr-2">✓</span>
                    En Carrito
                  </>
                ) : (
                  <>
                    <span className="mr-">+</span>
                    Agregar al Carrito
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2 bg-amber-300 dark:bg-amber-300 text-black dark:text-black"
                onClick={() => {
                  // Implementar funcionalidad de compra
                  alert('¡Funcionalidad de compra en desarrollo!');
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7V6a6 6 0 1112 0v1M3 7h18l-1.68 12.03A2 2 0 0117.34 21H6.66a2 2 0 01-1.98-1.97L3 7z"
                  />
                </svg>
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
    </>
  );
});

export default ProductDetail;
