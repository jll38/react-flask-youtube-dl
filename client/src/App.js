import 'antd/dist/reset.css';
import './App.css';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react'



function App() {

  const [data, setData] = useState([{}]);
  
  /*useEffect fetching json message from the backend*/
  useEffect(() => {       
    fetch("/greeting").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <ChakraProvider> {/*Neccesary for ChakraUI elements to work. To not use ChakraUI replace <ChakraProvider></ChakraProvider> with <></>*/}
      <Container h='92vh;'maxW='1000px' p='20px' mb='10px'centerContent>
        <Router>
          <Routes> {/*Add routes for new pages here | See ./pages */}
            <Route path="*" element={<NotFound />} /> {/*Wildcard Path, any URL that isn't defined in another route will land here*/}
            <Route path="/" element={<HomePage />} /> 
          </Routes>
        </Router>
      </Container>
      <Footer />
    </ChakraProvider>
  )
}

export default App

