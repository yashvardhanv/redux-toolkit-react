import { VStack, Button, HStack } from '@chakra-ui/react'
import InsertEmployee from './InsertEmployee'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

const Home = () => {
    return (
        <>
            <VStack spacing={5} margin={10}>
                    <h1>Register Employee</h1>
                <HStack spacing={4}>

                    <InsertEmployee />
                </HStack>
                
                    <ChakraLink as={ReactRouterLink} to='/data'>
                        <Button colorScheme="teal">See Data</Button>
                    </ChakraLink>
                
            </VStack>
        </>
    )
}

export default Home
