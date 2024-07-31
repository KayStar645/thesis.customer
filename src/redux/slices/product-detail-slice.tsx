import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCollectionType } from '@type/collection';
import { ProductDetailSliceType } from '@type/slice';

const initialState: ProductDetailSliceType = {
	data: undefined,
	quantity: 1,
};

const productDetailSlice = createSlice({
	name: 'product-detail',
	initialState,
	reducers: {
		setData(state, action: PayloadAction<ProductCollectionType | undefined>) {
			if (action.payload) {
				state.data = action.payload;
			}
		},
		setQuantity(state, action: PayloadAction<number>) {
			state.quantity = action.payload;
		},
	},
});

export { productDetailSlice };
