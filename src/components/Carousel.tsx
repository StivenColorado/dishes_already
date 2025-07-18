import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { productStore } from '@/stores/productStore';

const Carousel = observer(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Obtener productos del store
  const products = productStore.getAllProducts();

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) {
        await productStore.getRandomProducts();
      }
    };
    loadProducts();
  }, [products.length]);

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  // Mostrar loading o mensaje si no hay productos
  if (productStore.loading) {
    return (
      <div className="relative w-full h-full bg-card rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (productStore.error) {
    return (
      <div className="relative w-full h-full bg-card rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{productStore.error}</p>
          <button 
            onClick={() => productStore.fetchProducts()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="relative w-full h-full bg-card rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No hay productos disponibles</p>
        </div>
      </div>
    );
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = Math.abs(currentY - startY);
    const diffXAbs = Math.abs(diffX);
    
    // Prevenir scroll vertical solo si el movimiento es más horizontal que vertical
    // y si el movimiento horizontal es significativo
    if (diffXAbs > diffY && diffXAbs > 10) {
      e.preventDefault();
    }
    
    // Solo actualizar translateX si el movimiento es principalmente horizontal
    if (diffXAbs > diffY) {
      setTranslateX(-diffX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      // FIX: La lógica estaba invertida
      // Si translateX es negativo, significa que deslizamos hacia la derecha (next)
      // Si translateX es positivo, significa que deslizamos hacia la izquierda (prev)
      if (translateX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setTranslateX(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diffX = startX - currentX;
    setTranslateX(-diffX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(translateX) > 50) {
      // FIX: La lógica estaba invertida aquí también
      // Si translateX es negativo, significa que deslizamos hacia la derecha (next)
      // Si translateX es positivo, significa que deslizamos hacia la izquierda (prev)
      if (translateX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setTranslateX(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative w-full h-full bg-card rounded-lg overflow-hidden shadow-lg group">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing py-8 md:py-0"
        style={{ 
          touchAction: 'pan-y pinch-zoom',
          WebkitOverflowScrolling: 'touch'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-full h-full relative flex flex-col"
            >
              {/* Image */}
              <div className="relative h-3/5 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="h-2/5 p-6 flex flex-col justify-between bg-card">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium">
                    Ver Más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute  bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border-2 border-primary transition-all duration-300 focus:outline-none ${
              index === currentIndex
                ? 'bg-primary border border-amber-100'
                : 'bg-background hover:bg-primary/30'
            }`}
            style={{ minWidth: '12px', minHeight: '12px' }}
          />
        ))}
      </div>

      {/* Loading indicator for auto-play */}
      {isAutoPlaying && (
        <div className="absolute top-0 left-0 h-1 bg-primary/30 w-full">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{
              width: `${((Date.now() % 4000) / 4000) * 100}%`,
              animation: 'progress 4s linear infinite'
            }}
          />
        </div>
      )}

      
    </div>
  );
});

export default Carousel;