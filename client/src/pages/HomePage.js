import 'antd/dist/reset.css';
import '../App.css';
import React, { useState, useEffect } from 'react';
import HeaderDiv from '../components/HeaderDiv';
import {
  Center, Heading, Text, FormControl, Input,
  FormLabel, FormHelperText, Button
} from '@chakra-ui/react'

function HomePage() {

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
        }
      )
    } else{
      alert('Enter Valid URL')
    }
  }


  return (
    <>
      <Center h='inherit' w='inherit'>
        <Heading>Download Youtube Video</Heading>
        <FormControl>
          <FormLabel>Youtube URL</FormLabel>
          <Input type='text' placeholder='https://www.youtube.com/watch?v=jNQXAC9IVRw&' id='videoInput'></Input>
          <Button colorScheme='purple' onClick={handleSubmit}>Download</Button>
        </FormControl>
      </Center>
    </>
  );
}

export default HomePage;
