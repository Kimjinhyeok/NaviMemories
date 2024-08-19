import { Checkbox, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";

const PROPERTIES = {
  CV : 'cv',
  CN : 'cn'
}
export default function HideOptions() {

  const [state, setState] = useState({
    [PROPERTIES.CV] : false,
    [PROPERTIES.CN] : false,
  })
  const onChange = (property) => (event) => {
    const value = event.target.checked;
    
    const otherProperty =  property == PROPERTIES.CV 
                            ? PROPERTIES.CN
                            : PROPERTIES.CV;
    setState({
      [property] : value,
      [otherProperty] : state[otherProperty] ? false : state[otherProperty]
    })
  }
  return (
    <FormGroup row>
      <FormControlLabel control={<Checkbox />} value={state.cv} checked={state.cv} label="장절 숨김" onChange={onChange("cv")} />
      <FormControlLabel control={<Checkbox />} value={state.cn} checked={state.cn} label="본문 숨김" onChange={onChange("cn")} />
    </FormGroup>
  )
}