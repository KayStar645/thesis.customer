import { defineStyle, extendTheme, ChakraProvider as Provider } from '@chakra-ui/react';
import { ReactNode } from 'react';

const ChakraProvider = ({ children }: { children: ReactNode }) => {
	const buttonSm = defineStyle({
		fontWeight: '400',
		py: 2,
		h: 'fit-content',
	});

	const buttonMd = defineStyle({
		fontWeight: '400',
		py: 2,
		h: 'fit-content',
	});

	const themeConfig = extendTheme({
		colors: {
			'bright-green': '#16d3b4',
			'black': '#021512',
		},
		fonts: {
			'lexend-exa': 'lexend-exa',
		},
		styles: {
			global: {
				html: {
					fontSize: 14,
				},
				body: {
					fontFamily: 'lexend-exa',
					lineHeight: 1.6,
				},
			},
		},
		components: {
			Input: {
				field: {
					_placeholder: {
						fontSize: 'sm',
					},
				},
			},
			Button: {
				sizes: { sm: buttonSm, md: buttonMd },
				baseStyle: {
					lineHeight: 1.6,
				},
			},
		},
	});

	return <Provider theme={themeConfig}>{children}</Provider>;
};

export { ChakraProvider };
