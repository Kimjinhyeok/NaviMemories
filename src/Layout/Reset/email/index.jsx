import { useState } from "react";
import { Card, CardHeader, Container, useTheme } from "@mui/material";
import EnterEmailComponent from "./enter_email";
import SendedGuideComponent from "./sended_guide";

export default function UserEmailInputLayout({}) {

  const [result, setResult] = useState(false);

  const theme = useTheme();

  const onUpdateResult = (updatedValue) => {
    setResult(updatedValue);
  }

  return (
    <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="animate-fadeIn">
      <Card>
        <CardHeader title="가입 이메일 입력" sx={{ 
          backgroundColor : theme.palette.primary.main,
          color: theme.palette.primary.contrastText, }} />
        {
          result 
          ? <SendedGuideComponent />
          : <EnterEmailComponent
              onUpdateResult={onUpdateResult}
            />
        }
      </Card>
    </Container>
  )
}