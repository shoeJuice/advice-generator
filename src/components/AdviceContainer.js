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
    const isReloading = useState(false);

    useEffect(() => {
        getAdvice()
    }, [])

    function getAdvice(){

        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(response => setSlip({
            "id": response.slip.id,
            "advice": response.slip.advice
        }))
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
        <IconButton zIndex={0} isRound position='relative' top='-5' colorScheme='teal' onClick={() => {getAdvice()}} icon={<AiOutlineReload />}/>
    </Box>
  )
}

export default AdviceContainer