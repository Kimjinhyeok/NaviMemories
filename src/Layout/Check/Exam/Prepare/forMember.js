import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, InputAdornment, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useContext } from 'react';
import { Context } from '../../../../Utils/Context';
import Http from '../../../../Utils/Http';

export default function PrepareForMember(props) {

  const history = props.history;
  const http = Http();
  
  const {state : {version}} = useContext(Context);
  const InitOptions = {
    participation: 100,
    include242: "yes",        //with 242 verse
    themeOf242: "yes",
    precedence: "cn",
    version: version ? 'gae' : 'kor'
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
  const loadingCardList = async function() {

    history.push({
      pathname : '/test/loading',
      state : { 
        path: '/test/exam',
        version : options.version,
        include242 : options.include242,
        themeOf242 : options.themeOf242,
        participation : options.participation,
        precedence : options.precedence
      }
    });
  }
  return (
    <Card className={classes.prepare_root}>
      <CardHeader title="?????? ?????? ?????????" />
      <CardContent className={classes.prepare_content}>
        <div className={classes.prepare_form}>
          <TextField
            label="?????? ?????? ???"
            type="number"
            value={options.participation}
            required
            onChange={(event) => setOptions({...options, participation : event.target.value})}
            InputProps={{
              inputProps: {
                min: 5,
                step: 10,
              },
              endAdornment: <InputAdornment position="end">??????</InputAdornment>,
            }}
          />
          <FormControl>
            <FormLabel component="legend">242?????? ??????</FormLabel>
            <RadioGroup value={options.include242} onChange={event => { setOptions({ ...options, include242: event.target.value }) }}>
              <FormControlLabel value="yes" control={<Radio />} label="???" />
              <FormControlLabel value="no" control={<Radio />} label="?????????" />
            </RadioGroup>
          </FormControl>
          <FormControl disabled={options.include242 != "yes"}>
            <FormLabel component="legend">242 ?????? ??????</FormLabel>
            <RadioGroup value={options.themeOf242} onChange={event => { setOptions({ ...options, themeOf242: event.target.value }) }}>
              <FormControlLabel value="yes" control={<Radio />} label="???" />
              <FormControlLabel value="no" control={<Radio />} label="?????????" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel component="legend">?????? ?????? ??????</FormLabel>
            <RadioGroup
              value={options.precedence}
              onChange={(event) => { setOptions({ ...options, precedence: event.target.value }) }}>
              <FormControlLabel
                label="??????"
                value="cn"
                control={<Radio />}
              />
              <FormControlLabel
                label="??????"
                value="cv"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel component="legend">?????? ??????</FormLabel>
            <RadioGroup
              value={options.version}
              onChange={(event) => { setOptions({ ...options, version: event.target.value }) }}>
              <FormControlLabel
                label="????????????"
                value="kor"
                control={<Radio />}
              />
              <FormControlLabel
                label="????????????"
                value="gae"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </CardContent>
      <CardActions className={classes.prepare_actions}>
        <Button type="button" color="primary" variant="contained" onClick={loadingCardList}>??????</Button>
      </CardActions>
    </Card>
  )
}