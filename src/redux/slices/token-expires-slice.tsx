import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tokenExpiresSlice = createSlice({
	name: 'token-expires',
	initialState: false,
	reducers: {
		setTokenExpires: (state, action: PayloadAction<boolean>) => {
			return (state = action.payload);
		},
	},
});

export { tokenExpiresSlice };
