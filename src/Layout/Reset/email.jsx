import { Button, Card, CardContent, CardHeader, Container, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthUsecase from "../../Usecase/auth/auth";
import { useSnackbar } from "notistack";

export default function UserEmailInputLayout({}) {

  const [state, setState] = useState({
    email : "",
    sended : false,
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const onChangeEmail = ({target}) => {
    const { value } = target;

    setState({
      ...state,
      email : value
    });
  }

  const onClickSubmit = async () => {
    const { email } = state;
    const res = await AuthUsecase.reqResetEmail({email : email});

    if(res === true) {
      setState({
        ...state,
        sended : true
      })
    } else if(res === false) {
      enqueueSnackbar(res.message || "유효한 이메일이 아닙니다.", { variant: 'warning' })
    } else {
      enqueueSnackbar(res.message || "이메일 전송 중 장애가 발생했습니다.", { variant: 'error' })
    }
  }
  const moveBack = () => navigate(-1);
  const moveToLogin = () => navigate('/login');

  return (
    <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="animate-fadeIn">
      <Card>
        <CardHeader title="가입 이메일 입력" sx={{ 
          backgroundColor : theme.palette.primary.main,
          color: theme.palette.primary.contrastText, }} />
        {
          state.sended 
          ? <SendedMail 
              moveToLogin={moveToLogin} 
            />
          : <EnterUserEmail
              onChangeEmail={onChangeEmail}
              onClickSubmit={onClickSubmit}
              moveBack={moveBack} 
            />
        }
      </Card>
    </Container>
  )
}

const EnterUserEmail = ({
  onChangeEmail=()=>{},
  onClickSubmit=()=>{},
  moveBack=()=>{},
}) => (
  <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '24px' }} className="space-y-4">
    <TextField 
      label="가입시 등록한 이메일주소"
      type="email"
      onChange={onChangeEmail}
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
)
const SendedMail = ({
  moveToLogin=()=>{}
}) => (
  <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '24px' }} className="space-y-4">
    <Typography variant="h6" component='div' className="whitespace-pre-wrap text-center">
      {`이메일 전송이 완료되었습니다.\n비밀번호 변경 후 로그인해주세요.`}
    </Typography>
    <div className="flex flex-col space-y-2">
      <Button 
        color="primary" 
        variant="contained"
        onClick={moveToLogin}
      >로그인 하기</Button>
    </div>
  </CardContent>
)