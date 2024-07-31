import { imageConfig } from '@config/index';
import { ImageProps } from '@type/ui';
import { Image as ChakraImage } from '@chakra-ui/react';

const Image = ({ src, ...props }: ImageProps) => {
	return (
		<ChakraImage
			{...props}
			src={imageConfig[src as keyof typeof imageConfig]?.src || src}
			fallbackSrc='https://via.placeholder.com/150'
		/>
	);
};

export { Image };
export type { ImageProps };
