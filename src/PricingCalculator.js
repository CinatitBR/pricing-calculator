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

const ResultContainer = ({ results }) => {
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

const PricingCalculator = () => {
  const [inputValues, setInputValues] = useState({ 
    productCost: '',
    sellCost: '',
    packageCost: '',
    shipmentCost: '',
    sellerCommission: '',
    recommendationCommission: '',
    taxesCost: '',
    productCount: 5,
  });
  const [totalCost, setTotalCost] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ 
      ...inputValues, 
      [name]: value 
    });
  }

  useEffect(() => {

    // Check if all inputs are filled
    const areAllInputsFilled = () => {
      for (let [key, value] of Object.entries(inputValues)) {
        console.log({key, value});

        // If value doesn't exist
        if (!value) {
          return false;
        }
      }

      return true;
    }


    console.log(areAllInputsFilled());
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
              value={inputValues.productCost}
              placeholder="Custo do produto"
              name="productCost"
              addon="$"
              helperText="Equivale a R$200 por unidade"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Preço de venda" 
              value={inputValues.sellCost}
              placeholder="Preço de venda"
              name="sellCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Custo da embalagem" 
              value={inputValues.packageCost}
              placeholder="Custo da embalagem"
              name="packageCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Custo do transporte" 
              value={inputValues.shipmentCost}
              placeholder="Custo do transporte"
              name="shipmentCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Comissão do vendedor (%)" 
              value={inputValues.sellerCommission}
              placeholder="Comissão do vendedor"
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
              value={inputValues.recommendationCommission}
              placeholder="Comissão da indicação"
              name="recommendationCommission"
              addon="%"
              addonSide="right"
              helperText="Equivale a R$0.20 por unidade"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Imposto" 
              value={inputValues.taxesCost}
              placeholder="Custo do imposto"
              name="taxesCost"
              addon="$"
            />
          </GridItem>

          <GridItem>
            <VStack 
              h="100%"
              p="10px"
              bgColor="yellow.100"
              borderRadius="md"
              border="1px solid #F6E05E"
            >
              <InputNumber
                onChange={handleChange} 
                label="Cálculo de lucro"
                name="productCount"
                addon="Unidades"
                addonSide="right"
                w="80px"
                bgColor="gray.50"
                borderWidth="1px"
                min={0}
                value={inputValues.productCount}
                _addon={{ 
                  fontSize: 'sm', 
                  p: '4px',
                  bgColor: 'gray.100',
                  color: 'gray.600'
                }}
              />

              <Text color="gray.600" fontWeight="medium">
                lucro de &nbsp;
                <Text 
                  as="span" 
                  fontWeight="bold" 
                  fontSize="xl"
                  color="gray.700"
                >
                  R${totalProfit}
                </Text> 
              </Text>
            </VStack>
          </GridItem>

        </SimpleGrid>
        
        <ResultContainer
          results={[
            { label: 'Custo total por unidade', value: 'R$300' },
            { label: 'Porcentagem de lucro', value: '50%' }
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
