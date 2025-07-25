import { makeAutoObservable, flow } from 'mobx';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    size: string;
    color:string;
    warranty: string;
    use?: string; // Assuming 'use' is a typo and should be 'use'
}

export class ProductStore {
    products: Product[] = [];
    loading = false;
    error = '';
    searchQuery = '';
    isSearching = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchProducts = flow(function* (this: ProductStore) {
        console.log('Fetching products... with flow');
            this.loading = true;
            this.error = '';
            try {
                // Simulando delay de red
                yield new Promise(resolve => setTimeout(resolve, 1000));

                // Aquí deberías hacer una llamada a tu API
                // Por ahora, usaremos datos mockeados con URLs válidas
                this.products = [
                    {
                        id: '1',
                        name: 'Plato de Cerámica',
                        price: 15000,
                        description: 'Plato de cerámica artesanal con acabado mate',
                        image: '/dishes/dish1.webp',
                        category: 'cerámica',
                        size: '25cm',
                        color: 'Blanco',
                        warranty: '1 año',
                    },
                    {
                        id: '2',
                        name: 'Plato de Porcelana',
                        price: 20000,
                        description: 'Plato de porcelana fina con diseño elegante',
                        image: '/dishes/dish2.webp',
                        category: 'porcelana',
                        size: '25cm',
                        color: 'Negro',
                        warranty: '1 año',
                    },
                    {
                        id: '3',
                        name: 'Plato Hondo Negro',
                        price: 18000,
                        description: 'Plato hondo moderno con acabado negro brillante',
                        image: '/dishes/dish3.webp',
                        category: 'cerámica',
                        size: '25cm',
                        color: 'Negro',
                        warranty: '1 año'
                    },
                    {
                        id: '4',
                        name: 'Plato Decorativo',
                        price: 25000,
                        description: 'Plato decorativo artesanal con patrones únicos',
                        image: '/dishes/dish3.webp',
                        category: 'decorativo',
                        size: '25cm',
                        color: 'Negro',
                        warranty: '1'
                    }
                ];
            } catch (err) {
                this.error = 'Error al cargar los productos';
                console.error('Error fetching products:', err);
            } finally {
                this.loading = false;
            }
        })
    setSearchQuery(query: string) {
        this.loading = true; // Reset loading state when search query changes
        this.searchQuery = query;
        this.isSearching = query.trim().length > 0;
        this.loading = false; // Reset loading state after setting search query
    }

    get filteredProducts(): Product[] {
        if (!this.isSearching) return this.products;
        const q = this.searchQuery.toLowerCase();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }
    getProductById(id: string): Product | undefined {
        this.searchQuery = '';
        return this.products.find(product => product.id === id);
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    getRandomProducts(count: number = 3): Product[] {
        const shuffled = [...this.products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    getProductsByCategory(category: string): Product[] {
        return this.products.filter(product => product.category === category);
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    updateProduct(id: string, updates: Partial<Product>) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
        }
    }

    removeProduct(id: string) {
        this.products = this.products.filter(p => p.id !== id);
    }
}

export const productStore = new ProductStore();