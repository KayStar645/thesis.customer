import { ReactNode } from 'react';
import { Footer, Header } from '.';
import { Box } from '@chakra-ui/react';
import { MAX_WIDTH } from '@config/index';
import { HomeBanner } from '@component/pages/home';

const BaseLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Box background='gray.50'>
			<Header />
			<Box
				minH='100vh'
				maxW={MAX_WIDTH}
				mx='auto'
			>
				{children}
			</Box>
			<Footer />
		</Box>
	);
};

export { BaseLayout };
