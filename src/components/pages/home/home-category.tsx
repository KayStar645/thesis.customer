// HomeCategory.tsx
import React, { useState } from 'react';
import { useGet } from '@hook/queries';
import { CategoryCollectionType } from '@type/collection';
import {
	Box,
	Button,
	VStack,
	HStack,
	Text,
	Image,
	useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

const HomeCategory = () => {
	const categoryQuery = useGet<CategoryCollectionType[]>({ api: 'category' });
	const bg = useColorModeValue('white', 'gray.800');
	const hoverBg = useColorModeValue('gray.100', 'gray.700');
	const [openCategories, setOpenCategories] = useState<number[]>([]);

	const buildMenuTree = (
		categories: CategoryCollectionType[],
		parentId: number | null = null,
	): CategoryCollectionType[] => {
		const menuTree: CategoryCollectionType[] = [];

		categories.forEach((category) => {
			if (category.parentId === parentId) {
				const children = buildMenuTree(categories, category.id);
				if (children.length > 0) {
					category.children = children;
				}
				menuTree.push(category);
			}
		});

		return menuTree;
	};

	const menuTree = buildMenuTree(categoryQuery.data?.data || []);

	const handleClick = (category: CategoryCollectionType) => {
		if (category.children && category.children.length > 0) {
			setOpenCategories((prev) =>
				prev.includes(category.id)
					? prev.filter(id => id !== category.id)
					: [...prev, category.id]
			);
		} else {
			console.log(category);
			window.location.href = `http://localhost:8888/vi/category-detail?id=${category.id}`;
		}
	};

	const NestedMenuItem: React.FC<{ category: CategoryCollectionType; depth: number }> = ({
		category,
		depth,
	}) => {
		const hasChildren = category.children && category.children.length > 0;
		const isOpen = openCategories.includes(category.id);

		return (
			<VStack align="stretch" spacing={0} pl={depth * 4}>
				<HStack
					py={2}
					px={4}
					cursor="pointer"
					_hover={{ bg: hoverBg }}
					onClick={() => handleClick(category)}
					transition="all 0.2s"
				>
					<Image
						boxSize="2.5rem"
						borderRadius="full"
						src={category.icon || `https://picsum.photos/id/${category.id}/200`}
						alt={category.name}
						mr="16px"
					/>
					<Text fontSize="lg" fontWeight="medium">{category.name}</Text>
					{hasChildren && (
						<ChevronRightIcon
							ml="auto"
							boxSize={6}
							transform={isOpen ? 'rotate(90deg)' : 'none'}
							transition="transform 0.2s"
						/>
					)}
				</HStack>
				{hasChildren && isOpen && (
					<VStack align="stretch" spacing={0}>
						{category.children!.map((child) => (
							<NestedMenuItem key={child.id} category={child} depth={depth + 1} />
						))}
					</VStack>
				)}
			</VStack>
		);
	};

	return (
		<Box position="relative">
			<Button
				rightIcon={<ChevronDownIcon />}
				bg={bg}
				_hover={{ bg: hoverBg }}
				_active={{ bg: hoverBg }}
				borderRadius="md"
				boxShadow="sm"
				fontWeight="medium"
				px={6}
				py={3}
				fontSize="lg"
			>
				Danh mục sản phẩm
			</Button>
			<Box
				position="absolute"
				top="100%"
				left={0}
				zIndex={1}
				mt={2}
				bg={bg}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
				borderWidth={1}
				borderRadius="md"
				boxShadow="lg"
				maxH="80vh"
				overflowY="auto"
				minW="300px"
			>
				<VStack align="stretch" spacing={0}>
					{menuTree.map((category) => (
						<NestedMenuItem key={category.id} category={category} depth={0} />
					))}
				</VStack>
			</Box>
		</Box>
	);
};

export { HomeCategory };