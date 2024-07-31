import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartDetailType } from '@type/collection';
import { VoucherCollectionType } from '@type/collection/voucher-collection';

const initialState: CartDetailType = {
	details: [],
	total: 0,
	totalAmount: 0,
	totalDecrease: 0,
	message: '',
};

const cartSlice = createSlice({
	name: 'product-detail',
	initialState,
	reducers: {
		setData(state, action: PayloadAction<CartDetailType | undefined>) {
			if (action.payload) {
				state.details = action.payload.details;
				state.total = action.payload.total;
				state.totalAmount = action.payload.totalAmount;
				state.totalDecrease = action.payload.totalDecrease;
			}
		},
		removeItem: (state, action: PayloadAction<{ productId: number }>) => {
			state.details = state.details.filter(item => item.productId !== action.payload.productId);
		},
		updateItem(
			state,
			action: PayloadAction<{ productId: number; quantity: number; isSelected: boolean; index: number }>,
		) {
			state.details[action.payload.index] = {
				...state.details[action.payload.index],
				...action.payload,
			};
		},
		setVoucher(state, action: PayloadAction<VoucherCollectionType>) {
			state.voucher = action.payload;
		},
		setMessage(state, action: PayloadAction<string>) {
			state.message = action.payload;
		},
	},
});

export { cartSlice };
