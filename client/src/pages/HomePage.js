import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import DownloadInfo from '../components/DownloadInfo';
import HeaderDiv from '../components/HeaderDiv';
import {
  Center, Heading, Text, FormControl, Input,
  FormLabel, FormHelperText, Button, VStack, Image
} from '@chakra-ui/react'

function HomePage() {
  const [loadingInfo, setloadingInfo] = useState(true)
  const [data, setData] = useState()
  const handleSubmit = () => {
    const url = document.getElementById('videoInput').value;
    let destination = '/process'
    if(url.includes('list=')) {
      destination = '/process-playlist'
      console.log('Playlist detected')
    }
    console.log(`Destination: ${destination}`)
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (url.match(youtubeRegex)) {
      fetch(`${destination}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          link: url
        })
      }).then(
        res => res.json()
      ).then(
        data => {
          console.log(data)
          setData(data)
          setloadingInfo(false)
        }
      )
    } else {
      alert('Enter Valid URL')
    }
  }
  

  return (
    <>
      <Center h='inherit'>
        <VStack w='750px'>
          <Heading>Download Youtube Video</Heading>
          <FormControl>
            <FormLabel>Youtube URL</FormLabel>
            <Input type='text' placeholder='https://www.youtube.com/watch?v=jNQXAC9IVRw&' id='videoInput'></Input>
            <Button colorScheme='purple' onClick={handleSubmit}>Search</Button>
          </FormControl>
          {loadingInfo ? (<></>) : (<DownloadInfo data={data}/>)}
          <Text as='em' pt='20px'>This project is for <strong>educational purposes</strong> only</Text>
        </VStack>
        

      </Center>
    </>
  );
}

export default HomePage;
