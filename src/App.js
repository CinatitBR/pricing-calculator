import { ChakraProvider, Center } from '@chakra-ui/react';
import PricingCalculator from './PricingCalculator';

const App = () => {
  return (
    <ChakraProvider>
      <Center
        minW="full" 
        h="100vh" 
        bg="gray.100"
      >
        <PricingCalculator />
      </Center>
    </ChakraProvider>
  );
}

export default App;
