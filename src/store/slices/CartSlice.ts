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
			// aynı itemdan varsa quantity değerini 1 artır
			// total değerini hesaplama yap.
			const exists = state.cartSession.items.find(
				(x) => x.id == action.payload.id
			);

			if (exists) {
				exists.quantity += 1;
			} else {
				state.cartSession.items = [...state.cartSession.items, action.payload];
			}

			let total = 0;

			state.cartSession.items.forEach((item: CartItem) => {
				total += item.price * item.quantity;
			});

			state.cartSession.total = total;
		},
		removeFromCart: (
			state: CartState,
			action: PayloadAction<{ id: number }>
		) => {
			// sadece silinmeyenleri listeledekik.
			state.cartSession.items = state.cartSession.items.filter(
				(x) => x.id !== action.payload.id
			);

			let total = 0;

			state.cartSession.items.forEach((item: CartItem) => {
				total += item.price * item.quantity;
			});

			state.cartSession.total = total;
		},
		updateQuantity: (
			state: CartState,
			action: PayloadAction<{ id: number; quantity: number }>
		) => {
			const item = state.cartSession.items.find(
				(x) => x.id === action.payload.id
			);

			if (item) {
				item.quantity = action.payload.quantity;
			}

			let total = 0;

			state.cartSession.items.forEach((item: CartItem) => {
				total += item.price * item.quantity;
			});

			state.cartSession.total = total;
		},
	},
});

// Store bizden bir reducer tanımı istiyor. bu sebeple slice üzerinden export ediyoruz.
export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions; // componentlerden ilgili actionları tetikleyebilmek için actionları slice üzerinden export ediyoruz.

// 3. aşama geliştirilen slice'ı reducer olarak store tanıtmak.
