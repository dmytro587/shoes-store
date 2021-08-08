import React from 'react'
import { FieldInputProps } from 'react-final-form'
import Select from 'react-select'

const MultiSelect: React.FC<{ input: FieldInputProps<any> }> = ({
   input, ...rest
}) => (
   <Select isMulti { ...input } { ...rest } />
)

export default MultiSelect