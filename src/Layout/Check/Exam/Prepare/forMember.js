import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, InputAdornment, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core'
import React from 'react'

export default function PrepareForMember(props) {

  const InitOptions = {
    participation: 100,
    include242: "yes",        //PARTicipation 242 verse
    themeOf242: "yes",
    precedence: 'cn',
  }

  const [options, setOptions] = React.useState(InitOptions);

  const classes = makeStyles(theme => ({
    prepare_root: {
      marginTop: theme.spacing(3),
      width: '100%',
      maxHeight: '100%',
    },
    prepare_content: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '75vh',
    },
    prepare_form: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.action.focus}`,
      },
      '& div.MuiFormControl-root.MuiTextField-root > label.MuiFormLabel-filled, div.MuiFormControl-root.MuiTextField-root > label.Mui_focused': {
        fontSize: '1.4rem'
      },
      '& .MuiFormGroup-root[role=radiogroup]': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        '& label.MuiFormControlLabel-root': {
          flex: 1,
          justifyContent: 'center'
        }
      }
    },
    prepare_actions: {
      display: 'flex',
      flexDirection: 'row',
      '& > button': {
        flex: 1
      }
    },
  }))();
  return (
    <Card className={classes.prepare_root}>
      <CardHeader title="암송 실기 테스트" />
      <CardContent className={classes.prepare_content}>
        <div className={classes.prepare_form}>
          <TextField
            label="출전 구절 수"
            type="number"
            value={options.participation}
            onChange={(event) => setOptions({...options, participation : event.target.value})}
            InputProps={{
              inputProps: {
                min: 5,
                step: 10,
              },
              endAdornment: <InputAdornment position="end">구절</InputAdornment>,
            }}
          />
          <FormControl>
            <FormLabel component="legend">242구절 선택</FormLabel>
            <RadioGroup value={options.include242} onChange={event => { setOptions({ ...options, include242: event.target.value }) }}>
              <FormControlLabel value="yes" control={<Radio />} label="네" />
              <FormControlLabel value="no" control={<Radio />} label="아니요" />
            </RadioGroup>
          </FormControl>
          <FormControl disabled={options.include242 != "yes"}>
            <FormLabel component="legend">242 주제 포함</FormLabel>
            <RadioGroup value={options.themeOf242} onChange={event => { setOptions({ ...options, themeOf242: event.target.value }) }}>
              <FormControlLabel value="yes" control={<Radio />} label="네" />
              <FormControlLabel value="no" control={<Radio />} label="아니요" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel component="legend">선행 문제 선택</FormLabel>
            <RadioGroup
              value={options.precedence}
              onChange={(event) => { setOptions({ ...options, precedence: event.target.value }) }}>
              <FormControlLabel
                label="내용"
                value="cn"
                control={<Radio />}
              />
              <FormControlLabel
                label="장절"
                value="cv"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </CardContent>
      <CardActions className={classes.prepare_actions}>
        <Button type="button" color="primary" variant="contained">다음</Button>
      </CardActions>
    </Card>
  )
}