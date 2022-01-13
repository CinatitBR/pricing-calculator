import { 
  HStack,
  Box,
  Text,
  Divider
} from '@chakra-ui/react';

const DisplayResultsItem = ({ label, value }) => {
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

const DisplayResults = ({ results }) => {
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
        <DisplayResultsItem 
          key={index}
          label={result.label}
          value={result.value}
        />
      )}
    </HStack>
  );
}

export default DisplayResults;