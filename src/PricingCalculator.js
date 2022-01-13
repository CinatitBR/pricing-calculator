import { useState, useEffect } from 'react';
import { 
  Container,
  VStack,
  HStack,
  Heading, 
  SimpleGrid, 
  GridItem, 
  Box,
  Text,
  Divider
} from '@chakra-ui/react';

import InputNumber from './components/InputNumber';

const ResultBox = ({ label, value }) => {
  return (
    <Box>
      <Text 
        fontWeight="bold" 
        fontSize="md"
        color="gray.600"
      >
        {label}
      </Text>

      <Text
        fontWeight="bold"
        color="gray.800"
        fontSize="2xl"
      >
        {value}
      </Text>
    </Box>
  )
}

const ContainerResults = ({ results }) => {
  return (
    <HStack 
      spacing={8} 
      height="100px"
      divider={<Divider height="80%"  bgColor="black" orientation="vertical" />}
      w="full" 
      bgColor="#BEE3F8"
      border="1px solid #63B3ED"
      borderRadius="4px"
      p="0 20px"
    >
      {results.map((result, index) => 
        <ResultBox 
          key={index}
          label={result.label}
          value={result.value}
        />
      )}
    </HStack>
  );
}

const ContainerCalculateProfit = ({ 
  onChange, 
  productCount, 
  unitProfit 
}) => {
  const textColor = unitProfit > 0 ? 'green.700' : 'red.700';

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
        addonSide="right"
        w="80px"
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
          {unitProfit > 0 &&
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

const PricingCalculator = () => {
  // Input values
  const [inputValues, setInputValues] = useState({ 
    productCost: 0,
    sellCost: 0,
    packageCost: 0,
    shipmentCost: 0,
    taxesCost: 0,
    sellerCommission: 0,
    recommendationCommission: 0,
    productCount: 1,
  });

  const [totalCost, setTotalCost] = useState(0);
  const [unitProfit, setUnitProfit] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regex of a two decimal places number
    const regex = /^\s*-?\d+(\.\d{1,2})?\s*$/;

    // Check if value is an empty string.
    // Value will be an empty string when input is empty.
    if (value === '') {
      // Update input value to 0.
      setInputValues({
        ...inputValues, 
        [name]: 0 
      });

      return;
    }
    // Check if value is not a valid number 
    else if (regex.test(value) === false) {
      return;
    }

    // Update input value to a number.
    setInputValues({ 
      ...inputValues, 
      [name]: parseFloat(value) 
    });
  }

  useEffect(() => {
    const getTotalCost = () => {
      const { 
        productCost, 
        packageCost,
        shipmentCost,
        taxesCost,
        sellerCommission,
        recommendationCommission 
      } = inputValues;

      return (
        productCost 
        + packageCost
        + shipmentCost
        + ((taxesCost / 100) * productCost)
        + ((sellerCommission / 100) * productCost)
        + ((recommendationCommission / 100) * productCost)
      );
    }

    // Get current total cost
    const newTotalCost = getTotalCost();

    // Update totalCost
    setTotalCost(newTotalCost);

    console.log(inputValues.sellCost)

    // Check if sellCost was entered
    if (inputValues.sellCost > 0) {
      const newUnitProfit = inputValues.sellCost - newTotalCost;

      // Update unit profit
      setUnitProfit(newUnitProfit);
    }
  }, [inputValues]);

  return (
    <Container 
      maxW="container.lg" 
      bg="gray.50"
      p="24px"
      borderRadius="8px"
    >
      <VStack spacing="40px" align="flex-start">

        <Heading 
          as="h1"
          size="lg"
        >
          Análise de custo
        </Heading>

        <SimpleGrid 
          columns={2} 
          spacing="16px" 
          minW="full"
        >
          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Custo do produto" 
              value={inputValues.productCost === 0 ? '' : inputValues.productCost}
              placeholder="0.00"
              name="productCost"
              addon="$"
              helperText="Equivale a R$200 por unidade"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Preço de venda" 
              value={inputValues.sellCost === 0 ? '' : inputValues.sellCost}
              placeholder="0.00"
              name="sellCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Custo da embalagem" 
              value={inputValues.packageCost === 0 ? '' : inputValues.packageCost}
              placeholder="0.00"
              name="packageCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Custo do transporte" 
              value={inputValues.shipmentCost === 0 ? '' : inputValues.shipmentCost}
              placeholder="0.00"
              name="shipmentCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Comissão do vendedor (%)" 
              value={inputValues.sellerCommission === 0 ? '' : inputValues.sellerCommission}
              placeholder="0.0"
              name="sellerCommission"
              addon="%"
              addonSide="right"
              helperText="Equivale a R$0.20 por unidade"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Comissão da indicação (%)" 
              value={inputValues.recommendationCommission === 0 ? '' : inputValues.recommendationCommission}
              placeholder="0.0"
              name="recommendationCommission"
              addon="%"
              addonSide="right"
              helperText="Equivale a R$0.20 por unidade"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Imposto (%)" 
              value={inputValues.taxesCost === 0 ? '' : inputValues.taxesCost}
              placeholder="0.0"
              name="taxesCost"
              addon="%"
              addonSide="right"
            />
          </GridItem>

          <GridItem>
            <ContainerCalculateProfit
              onChange={handleChange}
              productCount={inputValues.productCount}
              unitProfit={unitProfit}
            />
          </GridItem>

        </SimpleGrid>
        
        <ContainerResults
          results={[
            { 
              label: 'Custo total por unidade', 
              value: totalCost 
            },
            { 
              label: 'Porcentagem de lucro', 
              value: '50%' 
            }
          ]}
        />
      </VStack>
    </Container>
  )
}

export default PricingCalculator;

/*

  Campos formulário:
  - Custo do produto *
  - Embalagem *
  - Transporte * 
  - Comissão do vendedor *  
  - Imposto * 
  - Cálculo de lucro (vendendo x quantidade)

  Exibir:
    - Custo total
    - Porcentagem de lucro
    - Cálculo de lucro dependendo da quantidade

 -
*/
