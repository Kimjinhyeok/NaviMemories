import { Button, CardContent, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthUsecase from "../../../Usecase/auth/auth";

export default function EnterEmailComponent({ onUpdateResult=()=>{} }) {

  const [email, setEmail] = useState("")
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onChangeEmail = ({target}) => {
    const { value } = target;

    setEmail(value);
  }

  const onClickSubmit = async () => {
    const res = await AuthUsecase.reqResetEmail({email : email});

    if(res === true) {
      onUpdateResult(res);
    } else if(res === false) {
      enqueueSnackbar(res.message || "유효한 이메일이 아닙니다.", { variant: 'warning' })
    } else {
      enqueueSnackbar(res.message || "이메일 전송 중 장애가 발생했습니다.", { variant: 'error' })
    }
  }
  const moveBack = () => navigate(-1);

  return (
    <CardContent
      sx={{ display: "flex", flexDirection: "column", padding: "24px" }}
      className="space-y-4"
    >
      <TextField
        label="가입시 등록한 이메일주소"
        type="email"
        onChange={onChangeEmail}
      />
      <div className="flex flex-col space-y-2">
        <Button color="primary" variant="contained" onClick={onClickSubmit}>
          확인
        </Button>
        <Button variant="outlined" onClick={moveBack}>
          뒤로
        </Button>
      </div>
    </CardContent>
  );
}
