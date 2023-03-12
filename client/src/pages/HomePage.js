import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import DownloadInfo from '../components/DownloadInfo';
import HeaderDiv from '../components/HeaderDiv';
import {
  Center, Heading, Text, FormControl, Input,
  FormLabel, FormHelperText, Button, VStack
} from '@chakra-ui/react'

function HomePage() {
  const [loadingInfo, setloadingInfo] = useState(true)
  const [data, setData] = useState()
  const handleSubmit = () => {
    const url = document.getElementById('videoInput').value;
    
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (url.match(youtubeRegex)) {
      fetch("/process", {
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
      <Center h='inherit' w='inherit'>
        <VStack>
          <Heading>Download Youtube Video</Heading>
          <FormControl>
            <FormLabel>Youtube URL</FormLabel>
            <Input type='text' placeholder='https://www.youtube.com/watch?v=jNQXAC9IVRw&' id='videoInput'></Input>
            <Button colorScheme='purple' onClick={handleSubmit}>Download</Button>
            <Text as='em'>This project is for <strong>educational purposes</strong> only</Text>
          </FormControl>
          {loadingInfo ? (<></>) : (<DownloadInfo data={data}/>)}
        </VStack>

      </Center>
    </>
  );
}

export default HomePage;
