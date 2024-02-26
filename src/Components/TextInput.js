import { TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function TextInput({
  type="",
  label="",
  value="",
  placeholder="",
  required=false,
  onChange=(value)=>{},
  props={}
}) {

  const [state, setState] = useState(value);
  useEffect(() => {
    setState(value);
  }, [value])
  
  const handleOnChange = (event) => {
    const v = event.target.value;
    onChange(v)
    setState(v);
  }
  return (
    <TextField 
      type={type} 
      variant="outlined" 
      label={label} 
      value={state}
      required={required}
      placeholder={placeholder}
      onChange={handleOnChange}
      inputProps={props}
    />
  )
}