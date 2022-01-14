import { useState, useEffect } from 'react';
import { 
  Container,
  VStack,
  Heading, 
  SimpleGrid, 
  GridItem 
} from '@chakra-ui/react';

import InputNumber from './components/InputNumber';
import DisplayProfit from './components/DisplayProfit';
import DisplayResults from './components/DisplayResults';

const PricingCalculator = () => {
  // Input values
  const [inputValues, setInputValues] = useState({ 
    productCost: 0,
    sellCost: 0,
    packageCost: 0,
    shipmentPercentage: 0,
    taxesPercentage: 0,
    sellerCommission: 0,
    recommendationCommission: 0,
    productCount: 1,
  });

  const [totalCost, setTotalCost] = useState(0);
  const [unitProfit, setUnitProfit] = useState(0);

  // Absolute values from the percentage
  const sellerCommissionAbs = +((inputValues.sellerCommission / 100) * inputValues.productCost).toFixed(2);
  const recommendationComissionAbs = +((inputValues.recommendationCommission / 100) * inputValues.productCost).toFixed(2);
  const taxesAbs = +((inputValues.taxesPercentage / 100) * inputValues.productCost).toFixed(2);
  const shipmentAbs = +((inputValues.shipmentPercentage / 100) * inputValues.productCost).toFixed(2);

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
        shipmentPercentage,
        taxesPercentage,
        sellerCommission,
        recommendationCommission 
      } = inputValues;

      return +(
        productCost 
        + packageCost
        + ((shipmentPercentage / 100) * productCost)
        + ((taxesPercentage / 100) * productCost)
        + ((sellerCommission / 100) * productCost)
        + ((recommendationCommission / 100) * productCost)
      ).toFixed(2);
    }

    // Get current total cost
    const newTotalCost = getTotalCost();

    // Update some states
    setTotalCost(newTotalCost);

    // Check if sellCost was entered
    if (inputValues.sellCost > 0) {
      let newUnitProfit = inputValues.sellCost - newTotalCost;
      newUnitProfit = +newUnitProfit.toFixed(2); // Round unit profit to 2 decimal places

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
      boxShadow="lg"
    >
      <VStack spacing="40px" align="flex-start">

        <Heading 
          as="h1"
          size="lg"
        >
          Análise de custos
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
              addon="R$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Preço de venda" 
              value={inputValues.sellCost === 0 ? '' : inputValues.sellCost}
              placeholder="0.00"
              name="sellCost"
              addon="R$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Custo da embalagem" 
              value={inputValues.packageCost === 0 ? '' : inputValues.packageCost}
              placeholder="0.00"
              name="packageCost"
              addon="R$"
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Transporte (%)" 
              value={inputValues.shipmentPercentage === 0 ? '' : inputValues.shipmentPercentage}
              placeholder="0.00"
              name="shipmentPercentage"
              addon="%"
              addonSide="right"
              helperText={`Equivale a R$${shipmentAbs} por unidade`}
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
              helperText={`Equivale a R$${sellerCommissionAbs} por unidade`}
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
              helperText={`Equivale a R$${recommendationComissionAbs} por unidade`}
            />
          </GridItem>

          <GridItem>
            <InputNumber
              onChange={handleChange} 
              label="Imposto (%)" 
              value={inputValues.taxesPercentage === 0 ? '' : inputValues.taxesPercentage}
              placeholder="0.0"
              name="taxesPercentage"
              addon="%"
              addonSide="right"
              helperText={`Equivale a R$${taxesAbs} por unidade`}
            />
          </GridItem>

          <GridItem>
            <DisplayProfit
              onChange={handleChange}
              productCount={inputValues.productCount}
              unitProfit={unitProfit}
            />
          </GridItem>

        </SimpleGrid>
        
        <DisplayResults
          results={[
            { 
              label: 'Custo total por unidade', 
              value: `R$${totalCost}`, 
              valueColor: 'red.600'
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
