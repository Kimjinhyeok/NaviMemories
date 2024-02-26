import { Button, Card, CardActions, CardContent, CardHeader, Container, makeStyles, TextField } from '@mui/material'
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import React from 'react'
import Http from '../../Utils/Http';
import JoinPasswordsComponent from './passwords';

export default function JoinComponent(props) {

  const { history } = props;
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
        flexwrap : 'wrap',
        flexDirection : 'column'
    },
    title : {
      backgroundColor : theme.palette.primary.main,
      color : theme.palette.primary.contrastText
    },
    margin : {
        margin : theme.spacing(1)
    },
    action : {
        display : 'flex',
        flexWrap : 'wrap',
        flexDirection : 'row',
        paddingRight : theme.spacing(3),
        paddingLeft : theme.spacing(3)
    },
    subActions : {
        width : '50%'
    }
  }))
  const classes = useStyles();

  const [values, setValues] = React.useState({
    password : '',
    passwordRepeat : '',
    id : '',
    name : '',
    email : '',
    mobile: '',
  })
  const [validation, setValidation] = React.useState({
    password : false,
    passwordRepeat : false,
    id : false,
    name : false,
    email : false,
    mobile: false,
  })
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (props) => (event) => {
    setValues({...values, [props]: event.target.value });
  };
  const handleOnlyAphabet = (event) => {
    if(!event.target.value || /^([a-zA-Z0-9]+)$/i.test(event.target.value)) {
      handleChange("id")(event);
    } 
    if(event.target.value.length < 5) {
      setValidation({...validation, id : true})
    } else if (validation.id) {
      setValidation({...validation, id : false})
    }
  }
  const handleEmailValidate = () => {
    return !(values.email && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)))
  }
  const handleValidate = (checkList) => {
    for(var pt in checkList) {
      if(pt !== 'mobile' && !checkList[pt]) {
        return false
      }
    }
    return true;
  }

  const handleSummit = async function() {
    try {
      if(handleValidate(values)) {
        var signupValue = {
          pwd : values.password,
          id : values.id,
          name : values.name,
          email : values.email,
          mobile : values.mobile,
        }
        var result = await http.post({query : 'user/signup', data : signupValue});

        if(result instanceof Error) {
          enqueueSnackbar("회원가입 중 장애가 발생했습니다.", {variant: 'error'});
          return;
        } 
        history.push('/login');
      } else {
        enqueueSnackbar("필수 입력 항목을 채워주세요.", {variant: 'warning'});
      }
    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar(message, {variant: 'error'})
      console.error(error);
    }
  }
  const handleCancel = () => {
    history.goBack();
  }
  return (
    <Container maxWidth="sm" className={classes.container_root}>
      <Card>
        <CardHeader title="회원가입" className={classes.title}></CardHeader>
        <CardContent>
          <div className={classes.content_root}>
            <TextField
              label="성명"
              value={values.name}
              onChange={handleChange('name')}
              required={true}
              className={clsx(classes.margin, classes.textField)}
              helperText={values.name ? '' : "성명을 입력해주세요."}
              error={validation.name}
            ></TextField>
            <TextField
              label="아이디"
              value={values.id}
              onChange={handleOnlyAphabet}
              required={true}
              className={clsx(classes.margin, classes.textField)}
              error={validation.id}
              helperText={validation.id ? "아이디를 5자 이상 입력해주세요." : ''}
            ></TextField>
            <JoinPasswordsComponent value={values} classes={classes} handleChange={handleChange} ></JoinPasswordsComponent>
            <TextField
              error={handleEmailValidate()}
              label="이메일"
              value={values.email}
              onChange={handleChange('email')}
              required={true}
              type="email"
              className={clsx(classes.margin, classes.textField)}
            ></TextField>
            <TextField
              label="핸드폰"
              value={values.mobile}
              onChange={handleChange('mobile')}
              type="mobile"
              className={clsx(classes.margin, classes.textField)}
            ></TextField>
          </div>
        </CardContent>
        <CardActions className={classes.action} disableSpacing={true}>
          <Button color="secondary" className={classes.subActions} onClick={handleCancel}>취소</Button>
          <Button color="primary" variant="contained" className={classes.subActions} onClick={handleSummit}>가입</Button>
        </CardActions>
      </Card>
    </Container>
  )
}