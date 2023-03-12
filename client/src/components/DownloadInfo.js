import {
    Box,
    Heading,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Button,
    Image,
    HStack
    
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';

  export default function DownloadInfo({data}) {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        borderRadius='6px'
        boxShadow='-1px 10px 21px -3px rgba(0,0,0,0.75)'
        p='20px'>
            <Heading>{data.title}</Heading>
            <HStack spacing='125px'>
                <Container float='left'>
                <Text>{data.channel}</Text>
                <Image src={data.thumbnail_url} maxW='200px'></Image>
                </Container>
                <Container float='right'>
                    <Button>Download</Button>
                </Container>
            </HStack>
      </Box>
    );
  }