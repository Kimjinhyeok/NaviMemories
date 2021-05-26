import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx'

export default function LoginComponent () {

    const useStyles = makeStyles((theme) => ({
        root : {
            display : 'flex',
            flexwrap : 'wrap',
            flexDirection : 'column'
        },
        margin : {
            margin : theme.spacing(1)
        },
        action : {
            display : 'flex',
            flexWrap : 'wrap',
            flexDirection : 'column',
        },
        subActions : {
            width : '100%'
        }
    }))
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password : '',
        id : '',
        showPassword : false,
    })

    const handleChange = (props) => (event) => {
        setValues({...values, [props]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword : !values.showPassword});
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    return (
        <Container maxWidth="sm">
            <Card>
                <CardHeader title="로그인"/>
                <CardContent>
                    <div className={classes.root}>
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
                            >
                            </Input>
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions className={classes.action} disableSpacing={true}>
                    <Button className={classes.subActions} variant='contained' size="large" color="primary">로그인</Button>
                    <Box  className={classes.subActions} display="flex" flexDirection="row" flexWrap="wrap" justifyContent='space-between' maxWidth="sm">
                        <Button size="small" color="primary"onClick={() => {}}>비밀번호 찾기</Button>
                        <Button size="small" color="primary"onClick={() => {}}>회원가입</Button>
                    </Box>
                </CardActions>
            </Card>
        </Container>
    )
}