// 2. adım ilgili Global State ait state güncellemelerin ve state modellenmesinin yapılması

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItem = {
	id: number;
	quantity: number;
	name: string;
	price: number;
};

export type Cart = {
	items: CartItem[]; // Sepetteki ürünler
	total: number; // Sepet tutarı
};

export type CartState = {
	cartSession: Cart;
};

const initialCart: CartState = {
	cartSession: { items: [], total: 0 },
};

// ilgili state'in logic olarak yönetilmesini slice ile yapıyoruz.
const cartSlice = createSlice({
	name: 'CART', // Redux Action Type Prefix
	initialState: initialCart,
	reducers: {
		addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
			state.cartSession.items = [...state.cartSession.items, action.payload];
		},
		removeFromCart: () => {},
		updateQuantity: () => {},
	},
});

// Store bizden bir reducer tanımı istiyor. bu sebeple slice üzerinden export ediyoruz.
export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions; // componentlerden ilgili actionları tetikleyebilmek için actionları slice üzerinden export ediyoruz.

// 3. aşama geliştirilen slice'ı reducer olarak store tanıtmak.
