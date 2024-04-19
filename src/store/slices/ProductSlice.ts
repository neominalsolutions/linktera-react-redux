/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product, getProducts } from '../../services/product.service';

export type ProductFecthState = {
	products: Product[];
	loading: boolean;
	error: any | null;
};

// async olarak tanımlanmış bir yapının client state aktarılmasını sağlamak için Redux Thunk middleware kullandık.
// createAsyncThunk ile asenkron verileri işleyebiliyoruz.
export const productFetch = createAsyncThunk('FETCHProducts', async () => {
	return await getProducts();
});

// async ifadeleri client state aktarırken extraReducers tanımlarını kullanıyoruz.
// async statelerin -> server state, pending, fullfilled, rejected, settled

const productFetchInit: ProductFecthState = {
	products: [],
	loading: false,
	error: null,
};

// async verinin çekilme anı buna göre bir case yazıyoruz productFetch.pending

export const productSlice = createSlice({
	name: 'PRODUCTS',
	initialState: productFetchInit,
	reducers: {}, // çekilen veri ile ilgili mutation işlemleri varsa yani cleint veri değişimide güncelleme gibi durumlar varsa reducers kısıma yazılır.
	extraReducers(builder) {
		builder.addCase(productFetch.pending, (state: ProductFecthState) => {
			state.loading = true;
		});
		builder.addCase(
			productFetch.fulfilled,
			(state: ProductFecthState, action: PayloadAction<any>) => {
				console.log('action-payload', action.payload);
				state.loading = false;
				state.products = [...action.payload];
			}
		);
		builder.addCase(
			productFetch.rejected,
			(state: ProductFecthState, action: PayloadAction<any>) => {
				state.loading = false;
				state.products = [];
				state.error = { ...action.payload };
			}
		);
	},
});

export const productReducer = productSlice.reducer;
