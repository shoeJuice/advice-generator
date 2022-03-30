import React, {useState, useEffect} from 'react'

import {
    Box, Flex, Button, Text, Grid, Icon, IconButton, useColorModeValue, VStack, 
} from '@chakra-ui/react'

import {
    AiOutlineReload
} from 'react-icons/ai'

const AdviceContainer = (props) => {

    const containerColor = useColorModeValue('gray.100', 'whiteAlpha.200');
    const textColor = useColorModeValue('black', 'teal.400')
    const [slip, setSlip] = useState({
            "id": NaN,
            "advice": "Loading.."
    });
    const [isReloading, setIsReloading] = useState(false);
    const [loadingAdvice, setLoadingAdvice] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}`)
        .then(response => response.json())
        .then(response => setSlip({
            "id": response.slip.id,
            "advice": response.slip.advice
        }))
        console.log(slip)
    }, [])

    function getAdvice(){
        setLoadingAdvice(true)
        setTimeout(() => {
        fetch(`${process.env.REACT_APP_API}`)
        .then(response => response.json())
        .then(response => setSlip({
            "id": response.slip.id,
            "advice": response.slip.advice
        }))
        setLoadingAdvice(false)
        }, 2000)
        
    }

  return (
    <Box>
        <VStack
            backgroundColor={containerColor}
            textAlign='center'
            padding={10}
            borderRadius={6}
            spacing={3}
            {...props}
        >
            <Text
                color={textColor}

            >Advice #{slip.id}</Text>
            <Text
                margin='auto'
            >{slip.advice}</Text>
        </VStack>
        <IconButton zIndex={0} isRound isLoading={loadingAdvice} position='relative' top='-5' colorScheme='teal' onClick={() => {getAdvice()}} icon={<AiOutlineReload />}/>
    </Box>
  )
}

export default AdviceContainer