type LoginType = {
	userName: string;
	password: string;
};

type RegisterType = {
	phoneNumber: string;
	name: string;
	userName: string;
	email: string;
	address?: string;
	gender: string;
	password: string;
	confirmPassword: string;
};

type LoginResponse = {
	id: number;
	token: string;
	exp: string;
};

type ResetPasswordType = {
	token: string;
	password: string;
	confirmPassword: string;
};

type AuthenticationDataType = {
	access_token: string;
	refresh_token: string;
	expires: number;
	expires_at: number;
};

export type { LoginType, RegisterType, ResetPasswordType, AuthenticationDataType, LoginResponse };
