'use client';

import { Box, Center } from '@chakra-ui/react';
import { SliderProps } from '@type/ui';
import ReactSlickSlider from 'react-slick';
import { ReactIcon } from './react-icon';

const PrevArrow = (props: any) => {
	const { onClick } = props;

	return (
		<Center
			onClick={onClick}
			zIndex={2}
			position='absolute'
			top='50%'
			left='1rem'
			translateY='-50%'
			w={10}
			h={10}
			background='white'
			borderRadius='full'
			cursor='pointer'
			shadow='md'
			transition='all linear 0.1s'
			_hover={{
				backgroundColor: 'green.400',
				color: 'white',
			}}
		>
			<ReactIcon
				icon='IoChevronBack'
				size={20}
			/>
		</Center>
	);
};

const NextArrow = (props: any) => {
	const { onClick } = props;

	return (
		<Center
			onClick={onClick}
			zIndex={2}
			position='absolute'
			top='50%'
			right='1rem'
			translateY='-50%'
			w={10}
			h={10}
			background='white'
			borderRadius='full'
			cursor='pointer'
			shadow='md'
			transition='all linear 0.1s'
			_hover={{
				backgroundColor: 'green.400',
				color: 'white',
			}}
		>
			<ReactIcon
				icon='IoChevronForward'
				size={20}
			/>
		</Center>
	);
};

const Paginator = () => {
	return (
		<Box
			h='5px'
			width={10}
			borderRadius='full'
			backgroundColor='gray.200'
			transition='all linear 0.2s'
			shadow='lg'
		/>
	);
};

const Slider = ({ settings, children }: SliderProps) => {
	return (
		<Box
			dots={true}
			as={ReactSlickSlider}
			{...settings}
			position='relative'
			prevArrow={<PrevArrow />}
			nextArrow={<NextArrow />}
			customPaging={Paginator}
			dotsClass='react-slick-dots'
			className='react-slick-container'
			h='50%'
		>
			{children}
		</Box>
	);
};

export { Slider };
