import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx'
import Http from '../../Utils/Http'
import Cookies from 'js-cookie'
import { useSnackbar } from 'notistack'
import cookies from '../../Data/cookies'

export default function LoginComponent (props) {

    const http = Http();
    const useStyles = makeStyles((theme) => ({
        container_root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        content_root : {
            display : 'flex',
            flexWrap : 'wrap',
            flexDirection : 'column'
        },
        margin : {
            margin : theme.spacing(1)
        },
        title : {
          backgroundColor : theme.palette.primary.main,
          color : theme.palette.primary.contrastText
        },
        action : {
            display : 'flex',
            flexWrap : 'wrap',
            flexDirection : 'column',
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            
        },
        subActions : {
            width : '100%'
        }
    }))
    const classes = useStyles();
    const {history} = props;
    const [values, setValues] = React.useState({
        password : '',
        id : '',
        showPassword : false,
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (props) => (event) => {
        setValues({...values, [props]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword : !values.showPassword});
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const enterDownHandling = (event) => {
        if(event.key === 'Enter') {
            handleSummit();
        }
    }
    const handleSummit = async () => {
        try {
            if(!(values.id) && !(values.password)) {
                enqueueSnackbar("아이디 또는 비밀번호를 입력해주세요.", {variant: "warning"});
                return;
            }
            var result = await http.post({
                query : 'auth',
                data : {
                    id : values.id,
                    pwd : values.password
                }
            })
            if(result instanceof Error) {
                throw new Error("서버와 연결이 지연되고 있습니다. 잠시 후 시도해주세요.")
            }
            
            cookies.set('userName', result.data);
            history.push('/recitatoin');
        } catch (error) {
            const {message} = error.response.data;
            enqueueSnackbar(message || "로그인 중 오류가 발생했습니다.", {variant : 'error'})
            console.error(error);
        }
    }

    return (
        <Container maxWidth="sm" className={classes.container_root}>
            <Card>
                <CardHeader title="Navigators 암송 커뮤니티" className={classes.title}/>
                <CardContent>
                    <div className={classes.content_root}>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="login-text-id">ID</InputLabel>
                            <Input
                                id="login-text-id"
                                type="text"
                                value={values.id}
                                onChange={handleChange('id')}
                            ></Input>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="login-text-password">Password</InputLabel>
                            <Input
                                id="login-text-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
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
                            >
                            </Input>
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions className={classes.action} disableSpacing={true}>
                    <Button className={classes.subActions} variant='contained' size="large" color="primary" onClick={handleSummit}>확인</Button>
                    <Box  className={classes.subActions} display="flex" flexDirection="row" flexWrap="wrap" justifyContent='space-between' maxWidth="sm">
                        <Button size="small" color="primary" onClick={() => {}} disabled>비밀번호 찾기</Button>
                        <Button size="small" color="primary" onClick={() => {history.push('/join')}}>회원가입</Button>
                    </Box>
                </CardActions>
            </Card>
        </Container>
    )
}