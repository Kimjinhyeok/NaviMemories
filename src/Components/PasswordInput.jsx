import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { useRef, useState } from "react";

export default function InputPassword({ label = "", initValue = "", onChange = ()=>{}}) {

  const [state, setState] = useState({
    value : initValue,
    show : false,
  });

  const onChangeValue = (event) => {
    const {value} = event.target;
    setState({
      ...state,
      value : value
    })
    onChange(value);
  }
  const onClickVisibility = () => {
    setState({
      ...state,
      show : !state.show
    })
  }
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Input
        type={state.show ? "text" : "password"}
        fullWidth
        onChange={onChangeValue}
        value={state.value}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onClickVisibility}>
              {state.show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
