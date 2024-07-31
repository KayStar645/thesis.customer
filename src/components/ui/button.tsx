'use client';

import { Button as ChakraButton } from '@chakra-ui/react';
import { LoginCheckingModal } from '@component/modal';
import { useCookies } from '@hook/index';
import { ButtonProps } from '@type/ui';
import { MouseEvent as ReactMouseEvent, useState } from 'react';

const Button = ({ checkLogin, children, ...props }: ButtonProps) => {
	const { get } = useCookies();
	const [showModal, setShowModal] = useState(false);

	const onClick = (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (checkLogin && !get('is_login')) {
			setShowModal(true);

			return;
		}

		props.onClick?.(e);
	};

	return (
		<>
			<ChakraButton
				{...props}
				onClick={onClick}
			>
				{children}
			</ChakraButton>

			{showModal && <LoginCheckingModal />}
		</>
	);
};

export { Button };
