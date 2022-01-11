import { 
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input
} from '@chakra-ui/react'

const InputNumber = ({ label, placeholder, name }) => {
  return (
    <FormControl fontWeight="bold">
      <FormLabel 
        htmlFor={name} 
        color="gray.600"
        fontWeight="bold"
      >
        {label}
      </FormLabel>

    <InputGroup>
      <InputLeftAddon
        children="R$"
        bgColor="gray.200"
        color="gray.500"
      />
      
      <Input 
        id={name} 
        name={name}
        type="number"
        fontWeight="bold" 
        borderColor="gray.300"
        borderWidth="2px"
        placeholder={placeholder}
        _placeholder={{ fontWeight: 'normal' }}
      />  
    </InputGroup>

  </FormControl>
  )
}

export default InputNumber;
