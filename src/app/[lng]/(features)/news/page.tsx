'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Image,
    Text,
    Badge,
    VStack,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { BaseLayout } from '@component/layout';

// Define the interface for a news item
interface NewsItem {
    id: number;
    title: string;
    image: string;
    summary: string;
    date: string;
    category: string;
}

// Mocked news data
const newsData: NewsItem[] = [
    {
        id: 1,
        title: 'Siêu sale TV 4K - Giảm giá đến 30%',
        image: 'https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0624/dealsheet/MDA/15%20years%20SHA_NK%20banner-936%20x%20376.jpg',
        summary: 'Cơ hội cuối cùng để sở hữu TV 4K với giá không thể tin được. Chỉ diễn ra trong 3 ngày!',
        date: '2024-06-25',
        category: 'Khuyến mãi',
    },
    {
        id: 2,
        title: 'Ra mắt dòng tủ lạnh thông minh mới',
        image: 'https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2024/BE/Voucher%20T6/be-936x376px.jpg',
        summary: 'Khám phá tính năng đột phá của dòng tủ lạnh thông minh mới nhất, giúp bảo quản thực phẩm tối ưu.',
        date: '2024-06-23',
        category: 'Sản phẩm mới',
    },
    {
        id: 3,
        title: 'Hướng dẫn chọn máy giặt phù hợp cho gia đình',
        image: 'https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0324/Dealsheet/MDA/936x376_.jpg',
        summary: 'Tìm hiểu các yếu tố quan trọng cần cân nhắc khi chọn mua máy giặt cho gia đình bạn.',
        date: '2024-06-20',
        category: 'Hướng dẫn',
    },
    // Add more news items as needed
];

// Define props interface for NewsCard component
interface NewsCardProps {
    news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={cardBg} boxShadow="md">
            <Image src={news.image} alt={news.title} height="200px" width="100%" objectFit="cover" />
            <Box p="6">
                <HStack spacing={2} mb={2}>
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        {news.category}
                    </Badge>
                    <Text fontSize="sm" color={textColor}>
                        {new Date(news.date).toLocaleDateString()}
                    </Text>
                </HStack>
                <Heading as="h3" size="md" mb={2} isTruncated>
                    {news.title}
                </Heading>
                <Text fontSize="sm" color={textColor} noOfLines={3}>
                    {news.summary}
                </Text>
                <Button
                    as={Link}
                    href={`/news/${news.id}`}
                    mt={4}
                    colorScheme="blue"
                    size="sm"
                    rightIcon={<ChevronRightIcon />}
                >
                    Đọc thêm
                </Button>
            </Box>
        </Box>
    );
};

const NewsPage: React.FC = () => {
    const [visibleNews, setVisibleNews] = useState<number>(6);

    const loadMore = () => {
        setVisibleNews((prev) => Math.min(prev + 3, newsData.length));
    };

    return (
        <BaseLayout>
            <Container maxW="container.xl" py={10}>
                <VStack spacing={8} as="section" align="stretch">
                    <Heading as="h1" size="2xl" textAlign="center">
                        Tin tức & Khuyến mãi
                    </Heading>
                    <Text fontSize="xl" textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
                        Cập nhật thông tin mới nhất về sản phẩm, khuyến mãi và hướng dẫn sử dụng
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                        {newsData.slice(0, visibleNews).map((news) => (
                            <NewsCard key={news.id} news={news} />
                        ))}
                    </SimpleGrid>
                    {visibleNews < newsData.length && (
                        <HStack justify="center">
                            <Button colorScheme="blue" onClick={loadMore}>
                                Xem thêm tin tức
                            </Button>
                        </HStack>
                    )}
                </VStack>
            </Container>
        </BaseLayout>
    );
};

export default NewsPage;