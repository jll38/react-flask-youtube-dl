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
    const downloadVideo = async () => {
        try {
          const response = await fetch('/download');
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'video.mp4');
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.log(error);
        }
      }
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        borderRadius='6px'
        boxShadow='-1px 10px 21px -3px rgba(0,0,0,0.75)'
        p='20px'>
            <Heading>{data.title}</Heading>
            <HStack spacing='110px'>
                <Container float='left'>
                <Text>{data.channel}</Text>
                <Image src={data.thumbnail_url} maxW='200px'></Image>
                </Container>
                <Container float='right'>
                    <Button onClick={downloadVideo}>Download</Button>
                </Container>
            </HStack>
      </Box>
    );
  }