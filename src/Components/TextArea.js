import { TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function TextArea({
  label = "",
  rows = 6,
  multiline = true,
  value = { value },
  onChange = (value) => { },
  required = false,
  className = ""
}) {

  const [state, setState] = useState(value)
  useEffect(() => {
    setState(value);
  }, [value])

  const onHandleChange = (event) => {
    const v = event.target.value;
    setState(v);
    onChange(v);
  }
  return (
    <TextField
      type="text" 
      id="checking_content" 
      rows={rows} 
      variant="outlined" 
      value={state}
      defaultValue={value}
      multiline={multiline}
      required={required}
      autoComplete="off"
      label={label}
      className={className}
      onChange={onHandleChange}
    />
  )
}