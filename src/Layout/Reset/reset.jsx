import { Button, Card, CardContent, CardHeader, Container, useTheme } from "@mui/material";
import InputPassword from "../../Components/PasswordInput";
import { useNavigate } from "react-router";
import AuthUsecase from "../../Usecase/auth/auth";
import { useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import { useSearchParams } from "react-router-dom";

const PWD1 = 'pwd1';
const PWD2 = 'pwd2';

export default function UserPasswordResetLayout({}) {

  const values = useRef({
    [PWD1] : "",
    [PWD2] : "",
    token : "",
  })

  const theme = useTheme();
  const navigate = useNavigate();
  const param = useSearchParams()[0];
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    const token = param.get('token');
    if(token) {
      values.current = {
        ...values.current,
        token,
      }
    }
  }, [param])
  
  
  const onChangePwds = (property) => (value) => {
    values.current = {
      ...values.current,
      [property] : value
    }
  }
  const onClickChange = async () => {

    const {
      [PWD1] : password,
      [PWD2] : passwordRepeat,
      token,
    } = values.current;
    const res = await AuthUsecase.changePassword({
      password,
      passwordRepeat,
      token
    })

    if(res === true) {
      enqueueSnackbar('비밀번호 변경에 성공했습니다.');
      navigate('/');
    } else if(res === false) {
      enqueueSnackbar('비밀번호 변경에 실패했습니다.', { variant: 'warning' });
    } else {
      enqueueSnackbar(res.message || '에러가 발생했습니다.', { variant: 'error' });
      console.debug(res);
    }
  }
  const onClickCancel = () => {
    navigate('/');
  }
  return (
    <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card>
        <CardHeader title='새 비밀번호 입력' sx={{ 
          backgroundColor : theme.palette.primary.main,
          color: theme.palette.primary.contrastText, }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '24px' }} className="space-y-4">
          <InputPassword
            label="비밀번호 입력"
            onChange={onChangePwds(PWD1)}
          />
          <InputPassword
            label="비밀번호 확인"
            onChange={onChangePwds(PWD2)}
          />
          <div className="w-full flex flex-col space-y-2">
            <Button variant="contained" color="primary" onClick={onClickChange}>확인</Button>
            <Button variant="outlined" onClick={onClickCancel}>취소</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}