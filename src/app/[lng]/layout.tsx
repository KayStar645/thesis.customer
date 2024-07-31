'use client';

import { ChakraProvider, ReactQueryProvider } from '@provider/index';
import { TokenExpiresModal } from '@root/src/components/modal';
import { PageType } from '@type/common';
import { dir } from 'i18next';
import { Bounce, ToastContainer } from 'react-toastify';

const AppLayout = ({ children, params: { lng } }: PageType) => {
	return (
		<html
			lang={lng}
			dir={dir(lng)}
		>
			<body>
				<ReactQueryProvider>
					<ChakraProvider>
						{children}

						<TokenExpiresModal />

						<ToastContainer
							position='top-right'
							autoClose={2500}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick={true}
							rtl={false}
							pauseOnFocusLoss={true}
							draggable={true}
							pauseOnHover={true}
							transition={Bounce}
							limit={1}
						/>
					</ChakraProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
};

export default AppLayout;
