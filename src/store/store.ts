import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartReducer } from './slices/CartSlice';
import { productReducer } from './slices/ProductSlice';

const store = configureStore({
	reducer: {
		cartState: cartReducer, // store reducer ekledik. birden fazla reducer tanımlanabilir
		productState: productReducer,
	},
});

export type AppDispatch = typeof store.dispatch;

// uygulama içerisinde redex ile yazılmış bir action fırlatılmasını sağlar.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// uygulama genelinde store tanımlanan tüm statelere erişim yapmmaızı sağlar.
export type RootState = ReturnType<typeof store.getState>;

export default store;
