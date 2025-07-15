import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Navbar from "@/components/Navbar";
import { Button } from "../components/ui/button";
import Carousel from "@/components/Carousel";
import Catalog from "./Catalog";
import { useStores } from "@/stores/storeContext";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Check } from "lucide-react";
const Home = observer(() => {
  const { t } = useTranslation();
  const { productStore, cartStore } = useStores();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  const { loading, error, filteredProducts, isSearching } = productStore;

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-8">
        {!isSearching && (
          <div>
            <div className="flex flex-col lg:flex-row gap-8 items-center p-8">
              {/* Contenido principal - Lado izquierdo */}
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {t("home.welcome")}
                  <span className="text-primary block">{t("home.brand")}</span>
                </h1>

                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                  {t("home.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="w-full sm:w-auto text-lg px-8 py-3">
                    {t("home.catalog_button")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-lg px-8 py-3"
                  >
                    {t("home.about_button")}
                  </Button>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">
                      {t("home.stats.products")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">
                      {t("home.stats.clients")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">
                      {t("home.stats.support")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carrousel - Lado derecho */}
              <div className="flex-1 w-full md:w-1/2 h-[500px] lg:h-[600px]">
                <Carousel />
              </div>
            </div>
          </div>
        )}

        {/* productos */}
        <div className="container mx-auto py-8">
          <h1 className="text-3xl text-center font-bold mb-8">
            {t("home.catalog_title")}
          </h1>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">{t("home.loading")}</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{t("home.error")} {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <Card className="p-4">
                    <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">${product.price}</span>
                      <Button
                        variant="default"
                        className="bg-green-300 dark:bg-green-500 dark:hover:bg-green-600 hover:bg-green-400"
                        onClick={(e) => {
                          e.preventDefault();
                          cartStore.addItem(product.id, product.name, product.price);
                        }}
                      >
                        {cartStore.items.some((item) => item.id === product.id)
                          ? (<Check />) : (<ShoppingBag />)}
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("home.why_us")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.quality_title")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.quality_desc")}
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.shipping_title")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.shipping_desc")}
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="text-primary text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.secure_title")}
              </h3>
              <p className="text-muted-foreground">
                {t("home.secure_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Home;
