import { makeAutoObservable } from 'mobx';
import { toast } from 'react-hot-toast';

export class CartStore {
    items: { id: string; name: string; price: number; quantity: number; image: string }[] = [];
    total = 0;

    constructor() {
        makeAutoObservable(this);
    }

    addItem(id: string, name: string, price: number) {
        const existingItem = this.items.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
            toast.success(`${name} agregado al carrito`);
        } else {
            this.items.push({ id, name, price, quantity: 1, image: '' });
            toast.success(`${name} agregado al carrito`);
        }
        this.updateTotal();
    }

    removeItem(id: string) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity--;
                toast.success(`Cantidad de ${this.items[index].name} reducida`);
            } else {
                const removedItem = this.items[index];
                this.items.splice(index, 1);
                toast.success(`${removedItem.name} eliminado del carrito`);
            }
            this.updateTotal();
        }
    }

    updateQuantity(id: string, quantity: number) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(id);
            }
        }
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    get itemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}

export const cartStore = new CartStore();
