import { Button, Card, CardActions, CardContent, CardHeader, Container, makeStyles, TextField } from '@material-ui/core'
import clsx from 'clsx';
import React from 'react'
import JoinPasswordsComponent from './passwords';

export default function JoinComponent(props) {

  const { history } = props;
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
        flexDirection : 'row',
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
      if(pt !== 'mobile' && !pt) {
        return false
      } else if(pt === '') {

      }
    }
  }
  const handleSummit = () => {
    try {
      if(handleValidate(values)) {
        // send http
      }
    } catch (error) {
      // show error
    }
  }
  const handleCancel = () => {
    history.goBack();
  }
  return (
    <Container maxWidth="sm">
      <Card>
        <CardHeader title="회원가입"></CardHeader>
        <CardContent>
          <div className={classes.root}>
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
          <Button tpye="button" color="secondary" className={classes.subActions} onClick={handleCancel}>취소</Button>
          <Button type="button" color="primary" variant="contained" className={classes.subActions} onClick={handleSummit}>가입</Button>
        </CardActions>
      </Card>
    </Container>
  )
}