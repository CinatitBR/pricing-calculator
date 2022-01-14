import { 
  VStack,
  Text
} from '@chakra-ui/react';
import InputNumber from '../components/InputNumber';

const DisplayProfit = ({ 
  onChange, 
  productCount, 
  unitProfit 
}) => {
  let textColor = '';
  
  // Set textColor
  if (unitProfit > 0) {
    textColor = 'green.700';
  }
  else if (unitProfit < 0) {
    textColor = 'red.700';
  }
  else {
    textColor = 'gray.600'
  }
  
  return (
    <VStack 
      h="100%"
      p="10px"
      bgColor="yellow.100"
      borderRadius="md"
      border="1px solid #F6E05E"
    >
      <InputNumber
        onChange={onChange} 
        label="Cálculo de lucro"
        name="productCount"
        addon="Unidades"
        w="60px"
        bgColor="gray.50"
        borderWidth="1px"
        value={productCount === 0 ? '' : productCount}
        placeholder="0"
        _addon={{ 
          fontSize: 'sm', 
          p: '4px',
          bgColor: 'gray.100',
          color: 'gray.600'
        }}
      />

      {productCount !== 0 &&
        <Text color={textColor} fontWeight="medium">
          {unitProfit >= 0 &&
            <span>lucro de</span>
          }

          {unitProfit < 0 &&
            <span>prejuízo de</span>
          }

          &nbsp;

          <Text 
            as="span" 
            fontWeight="bold" 
            fontSize="xl"
            color={textColor}
          >
            R${productCount * Math.abs(unitProfit)}
          </Text> 
        </Text>
      }
    </VStack>
  )
}

export default DisplayProfit;