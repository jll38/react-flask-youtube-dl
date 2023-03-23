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
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Wrap,
  WrapItem

} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function DownloadInfo({ data }) {
  const [outputMedia, setOutputMedia] = useState('Media Type');
  const downloadVideo = async () => {
    try {
      const response = await fetch('/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          link: data.link,
          type: outputMedia.toLowerCase()
        })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RF-JL-${data.title}${outputMedia}`);
      document.body.appendChild(link);
      console.log(link)
      link.click();
      document.body.removeChild(link); // remove the link after download
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
          {data.playlist ? (
            <Box w='350px'>
              <Wrap h='250px' overflowY='scroll'>
                {data.thumbnails.map((thumbnail, index) => (
                  <WrapItem><Image key={index} src={thumbnail} maxW='75px'></Image>
                  <Text>{data.videoTitles[index]}</Text></WrapItem>
                ))}
              </Wrap>
            </Box>
          ) : (<></>)}
        </Container>
        <Container float='right'>
          <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>{outputMedia}</MenuButton>
            <MenuList>
              {data.mp4 ? (<MenuItem onClick={() => setOutputMedia('.MP4')}>MP4</MenuItem>) : (<MenuItem disabled>MP4</MenuItem>)}
              {data.mp3 ? (<MenuItem onClick={() => setOutputMedia('.MP3')}>MP3</MenuItem>) : (<MenuItem disabled>MP3</MenuItem>)}
            </MenuList>
            <Button onClick={() => {
              if (outputMedia != 'Media Type') {
                downloadVideo();
              } else {
                alert('Please select a media type');
              }

            }}>Download</Button>
          </Menu>
        </Container>
      </HStack>
    </Box>
  );
}
