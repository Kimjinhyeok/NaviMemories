import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx';
import React from 'react'

export default function JoinPasswordsComponent(props) {

  const {value, classes, handleChange} = props;
  
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
      <FormControl className={clsx(classes.margin, classes.textField)} required={true} error={handlePasswordMinValidate()}>
        <InputLabel htmlFor="join-password">비밀번호</InputLabel>
        <Input
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
        </Input>
        <FormHelperText>{handlePasswordMinValidate() ? "비밀번호는 최소 8자 이상이어야합니다." : ''}</FormHelperText>
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)} required={true} error={handlePasswordEqualValidate()}>
        <InputLabel htmlFor="join-repeat">비밀번호 확인</InputLabel>
        <Input
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
        </Input>
        <FormHelperText>{handlePasswordEqualValidate() ? "비밀번호가 일치하지 않습니다." : ""}</FormHelperText>
      </FormControl>
    </>
  )
}