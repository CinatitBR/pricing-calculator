import { 
  Container,
  VStack,
  HStack,
  Heading, 
  SimpleGrid, 
  GridItem, 
  Box,
  Text,
  Divider,
  InputGroup,
  Input,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,

  InputRightAddon
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

const PricingCalculator = () => {
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
              label="Custo do produto" 
              placeholder="Custo do produto"
              name="product-cost"
            />
          </GridItem>

          <GridItem>
            <InputNumber 
              label="Preço de venda" 
              placeholder="Preço de venda"
              name="sell-cost"
            />
          </GridItem>


          <GridItem>
            <InputNumber 
              label="Custo da embalagem" 
              placeholder="Custo da embalagem"
              name="package-cost"
            />
          </GridItem>

          <GridItem>
            <InputNumber 
              label="Custo do transporte" 
              placeholder="Custo do transporte"
              name="shipment-cost"
            />
          </GridItem>

          <GridItem>
            <InputNumber 
              label="Comissão do vendedor" 
              placeholder="Comissão do vendedor"
              name="seller-commission"
            />
          </GridItem>

          <GridItem>
            <InputNumber 
              label="Imposto" 
              placeholder="Custo do imposto"
              name="taxes"
            />
          </GridItem>

        </SimpleGrid>

        <HStack minW="full" h="100px" spacing="16px">
          <VStack 
            h="100%"
            p="20px"
            bgColor="yellow.100"
            borderRadius="4px"
            justify="center"
            border="1px solid #F6E05E"
          >
            <InputGroup minW="200px">

              {/* <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper> */}

              <Input 
                type="number" 
                fontWeight="bold"
                bgColor="gray.50"
                defaultValue={15} 
                min={10} 
                max={20}
              />

              <InputRightAddon 
                children="Unidades"
                fontSize="sm"
                p="4px"
                fontWeight="bold"
                color="gray.600"
              />
            </InputGroup>

            <Text color="gray.600" fontWeight="medium">
              lucro de &nbsp;
              <Text 
                as="span" 
                fontWeight="bold" 
                fontSize="xl"
                color="gray.700"
              >
                R$360
              </Text> 
            </Text>
          </VStack>

          <HStack 
            spacing={8} 
            divider={<Divider height="80%"  bgColor="black" orientation="vertical" />}
            w="full" 
            bgColor="#BEE3F8"
            border="1px solid #63B3ED"
            borderRadius="4px"
            height="100%"
            p="0 20px"
          >
            <ResultBox 
              label="Custo total (unidade)"
              value="R$ 35"
            />

            <ResultBox 
              label="Porcentagem de lucro"
              value="50%"
            />
          </HStack>
        </HStack>

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
