import { Button, Card, CardActions, CardContent, CardHeader, Container, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import React, { useContext } from 'react'
import AlertDialog from '../../../Dialog/alertDialog';
import CategorySelector from '../../../categorySelector';
import cookies from '../../../../Data/cookies';
import { Context } from '../../../../Utils/Context';

export default function PrepareForGuest(props) {

  const history = props.history;
  const initialOption = {
    alert: true,
    series: [],
    include242: false,
    themeOf242: "true",
    precedence: "cn",
    version: "gae"
  }
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
      '& > div:first-child': {
        marginBottom: theme.spacing(2),
        flex: 1,
        overflowY: 'auto'
      }
    },
    prepare_actions: {
      display: 'flex',
      flexDirection: 'row',
      '& > button': {
        flex: 1
      }
    },
    prepare_form: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1)
      },
      '& .MuiFormGroup-root[role=radiogroup]': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
      }
    },
  }))();
  const {state : {version}} = useContext(Context);
  const [options, setOptions] = React.useState({...initialOption, version: version ? 'gae' : 'kor'});

  const handleChangeSeries = function (seriesList) {
    setOptions({
      ...options,
      series: seriesList
    })
  }

  React.useEffect(() => {
    let isInclude242 = options.series.findIndex(series => (series % 300) <= 99) > -1;
    setOptions({
      ...options,
      include242: isInclude242
    });
  }, [options.series])

  const loadingCardList = async function() {

    history.push({
      pathname : '/test/loading',
      state : { 
        mode : "v",
        path: '/test/exam',
        version : options.version,
        include242 : options.include242,
        themeOf242 : options.themeOf242,
        series : options.series,
        precedence : options.precedence
      }
    });
  }
  return (
    <Container maxWidth="sm">
      <Card>
        {options.alert ?
          <AlertDialog
            agreeAction={() => { setOptions({ ...options, alert: false }) }}
            disagreeAction={() => { history.goBack(); }}
            title="?????? ?????? ????????? ??????"
            message="?????? ?????? ???????????? OYO ????????? ???????????? ????????? ?????? ?????? ???????????? ?????? ????????? ?????? ??? ????????????. ?????? ???????????????????"
            open={options.alert}
          /> : <></>}
        <CardHeader title="?????? ?????? ?????????" />
        <CardContent className={classes.prepare_content}>
          <div>
            <CategorySelector onChange={handleChangeSeries} />
          </div>
          {
            options.include242 ?
              (
                <div className={classes.prepare_form}>
                  <FormControl>
                    <FormLabel component="legend">242 ?????? ??????</FormLabel>
                    <RadioGroup value={options.themeOf242} onChange={event => { setOptions({ ...options, themeOf242: event.target.value }) }}>
                      <FormControlLabel value="true" control={<Radio />} label="???" />
                      <FormControlLabel value="false" control={<Radio />} label="?????????" />
                    </RadioGroup>
                  </FormControl>
                </div>
              )
              : <></>
          }
          <div className={classes.prepare_form}>
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
          <Button type="button" variant="contained" color="primary" onClick={loadingCardList}>??????</Button>
        </CardActions>
      </Card>
    </Container>
  )
}