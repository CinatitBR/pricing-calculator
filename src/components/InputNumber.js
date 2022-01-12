import { 
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Input,
  FormHelperText
} from '@chakra-ui/react'

const InputNumber = ({ 
  label, 
  placeholder, 
  name, 
  addon, 
  addonSide = 'left', 
  helperText
}) => {
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
        {addonSide === 'left' &&
          <InputLeftAddon
            children={addon}
            bgColor="gray.200"
            color="gray.500"
          />
        }
        
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

        {addonSide === 'right' &&
          <InputRightAddon
            children={addon}
            bgColor="gray.200"
            color="gray.500"
          />
        } 
      </InputGroup>

      {helperText && 
        <FormHelperText>
          {helperText}
        </FormHelperText>
      }
    </FormControl>
  )
}

export default InputNumber;
