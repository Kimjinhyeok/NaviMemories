import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Http from "../../Utils/Http";
import { useSnackbar } from "notistack";
import cookies from "../../Data/cookies";
import { useNavigate } from "react-router";
import AuthUsecase from "../../Usecase/auth/auth";

export default function LoginComponent(props) {
  const http = Http();
  const navigator = useNavigate();
  const theme = useTheme();

  const [values, setValues] = React.useState({
    password: "",
    id: "",
    showPassword: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (props) => (event) => {
    setValues({ ...values, [props]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const enterDownHandling = (event) => {
    if (event.key === "Enter") {
      handleSummit();
    }
  };
  const handleSummit = async () => {
    try {

      const res = await AuthUsecase.signIn({
        id: values.id,
        pwd: values.password,
      });

      if(res instanceof Error) {
        enqueueSnackbar(res.message, {
          variant: "warning",
        });
      } else {
        cookies.set("userName", JSON.stringify(res));
        navigator("/recitation/00");
        window.location.reload();
      }

    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar(message || "로그인 중 오류가 발생했습니다.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardHeader
          title="Navigators 암송 커뮤니티"
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        />
        <CardContent>
          <div className={"flex flex-wrap flex-col space-y-3"}>
            <FormControl>
              <InputLabel htmlFor="login-text-id">ID</InputLabel>
              <Input
                id="login-text-id"
                type="text"
                value={values.id}
                onChange={handleChange("id")}
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="login-text-password">Password</InputLabel>
              <Input
                id="login-text-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onKeyDown={enterDownHandling}
              ></Input>
            </FormControl>
          </div>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            padding: "0px 16px 0px 16px",
          }}
          disableSpacing={true}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSummit}
          >
            확인
          </Button>
          <Box
            sx={{ width: "100%" }}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            maxWidth="sm"
          >
            <Button size="small" color="primary" onClick={() => {}} disabled>
              비밀번호 찾기
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                navigator("/join");
              }}
            >
              회원가입
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
}
