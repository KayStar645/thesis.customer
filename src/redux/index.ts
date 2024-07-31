import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import { reduxMiddlewares } from '../middleware/redux-middleware';
import { cartSlice, productDetailSlice, tokenExpiresSlice } from './slices';

const reducer = {
	tokenExpires: tokenExpiresSlice.reducer,
	productDetail: productDetailSlice.reducer,
	cart: cartSlice.reducer,
};

export const reduxStore = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(reduxMiddlewares);
	},
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>;
