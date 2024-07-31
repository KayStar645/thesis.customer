import { Skeleton } from '@chakra-ui/react';
import { Image, Slider } from '@component/ui';
import { skeletons } from '@lib/util';

const HomeBanner = () => {
	const data: string[] = [
		'https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2024/VPBank/2tr%C4%91%20TIVI/home-694x376.jpg',
		'https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0624/dealsheet/MDA/KV%20-%20AC%20for%20NK_644%20x%20376.jpg',
		'https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0624/HPW/14-16/new/SDA-644x376.jpg',
	];
	return (
		<Slider>
			{(data || skeletons<string>(5)).map((image) => (
				<Skeleton
					isLoaded={!!data}
					key={image}
				>
					<Image
						src={image}
						w='100%'
						h='100%'
						borderRadius={8}
						objectFit='contain'
					/>
				</Skeleton>
			))}
		</Slider>
	);
};

export { HomeBanner };
