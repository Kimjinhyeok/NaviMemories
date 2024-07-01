import { Button, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function SendedGuideComponent({}) {
  const navigate = useNavigate();

  const moveToLogin = () => navigate("/login");

  return (
    <CardContent
      sx={{ display: "flex", flexDirection: "column", padding: "24px" }}
      className="space-y-4"
    >
      <Typography
        variant="h6"
        component="div"
        className="whitespace-pre-wrap text-center"
      >
        {`이메일 전송이 완료되었습니다.\n비밀번호 변경 후 로그인해주세요.`}
      </Typography>
      <div className="flex flex-col space-y-2">
        <Button color="primary" variant="contained" onClick={moveToLogin}>
          로그인 하기
        </Button>
      </div>
    </CardContent>
  );
}
