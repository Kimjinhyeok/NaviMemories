import { Button, Card, CardContent, CardHeader, Container, useTheme } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import AuthUsecase from "../../Usecase/auth/auth";
import { useSnackbar } from "notistack";
import InputPassword from "../../Components/PasswordInput";

export default function UserResetPasswordLayout({}) {

  const password = useRef("");
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onPasswordChange = (value) => password.current = value;
  
  const moveBack = () => navigate(-1);

  const onClickSubmit = async () => {
    const result = await AuthUsecase.checkPassword({password : password.current});

    if(result) {
      navigate('./password')
    } else if( result === false) {
      enqueueSnackbar('비밀번호가 일치하지 않습니다.', { variant: 'warning' })
    } else {
      enqueueSnackbar(result.message || '', { variant: 'error' })
    }
  }
  return (
    <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="animate-fadeIn">
      <Card>
        <CardHeader title="비밀번호 확인" sx={{ 
          backgroundColor : theme.palette.primary.main,
          color: theme.palette.primary.contrastText, }} />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '24px' }} className="space-y-4">
          <InputPassword 
            label="현재 비밀번호"
            onChange={onPasswordChange}
          />
          <div className="flex flex-col space-y-2">
            <Button 
              color="primary" 
              variant="contained"
              onClick={onClickSubmit}
            >확인</Button>
            <Button
              variant="outlined"
              onClick={moveBack}
            >뒤로</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}