import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React from 'react'

export default function JoinPasswordsComponent(props) {

  const {value, handleChange} = props;
  
  const [show, setShow] = React.useState({
    password: false,
    repeat: false
  })

  const handleClickShowPassword = (props) => {
    var isShow = show[props];
    setShow({ ...show, [props] : !isShow});
  }
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  }
  const handlePasswordMinValidate = () => {
    return value.password.length < 8
  }
  const handlePasswordEqualValidate = () => {
    return value.password !== value.passwordRepeat;
  }
  return (
    <>
      <FormControl variant='outlined' required={true} error={handlePasswordMinValidate()}>
        <InputLabel sx={{ backgroundColor: 'white' }} htmlFor="join-password">비밀번호</InputLabel>
        <OutlinedInput
          id="join-password"
          type={show.password ? 'text' : 'password'}
          value={value.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => { handleClickShowPassword('password') }}
                onMouseDown={handleMouseDownPassword}
              >
                {show.password ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        >
        </OutlinedInput>
        <FormHelperText>{handlePasswordMinValidate() ? "비밀번호는 최소 8자 이상이어야합니다." : ''}</FormHelperText>
      </FormControl>
      <FormControl variant='outlined'  required={true} error={handlePasswordEqualValidate()}>
        <InputLabel sx={{ backgroundColor: 'white' }} htmlFor="join-repeat">비밀번호 확인</InputLabel>
        <OutlinedInput
          id="join-repeat"
          type={show.repeat ? 'text' : 'password'}
          value={value.passwordRepeat}
          onChange={handleChange('passwordRepeat')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => { handleClickShowPassword('repeat') }}
                onMouseDown={handleMouseDownPassword}
              >
                {show.repeat ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        >
        </OutlinedInput>
        <FormHelperText>{handlePasswordEqualValidate() ? "비밀번호가 일치하지 않습니다." : ""}</FormHelperText>
      </FormControl>
    </>
  )
}