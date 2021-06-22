import { Button, Card, CardContent, CardHeader, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import React from 'react'
import CategorySelector from '../../categorySelector'

export default  function RecitationExamPrepareComponent(props) {

  const classes = makeStyles(theme => ({
    prepare_root : {
      marginTop: theme.spacing(3),
      width: '100%',
      maxHeight: '100%',
    },
    prepare_content: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '75vh',
      '& > div': {
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
    choose_first : {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  }))();

  const steps = ["출전구절 선택", "첫 순서 선택", "암송 테스트 시작"];

  const [stepIndex, setStepIndex] = React.useState(0);
  return (
    <Card className={classes.prepare_root}>
      <CardHeader title={steps[stepIndex]}></CardHeader>
      <CardContent className={classes.prepare_content}>
        {
          stepIndex === 0 ? 
          (
            <div>
              <CategorySelector />
            </div>
          )
          :
          (
            <div>
              <RadioGroup className={classes.choose_first}>
                <FormControlLabel
                  label="장절 우선"
                  value="cv"
                  control={<Radio />} 
                />
                <FormControlLabel
                  label="내용 우선"
                  value="cn"
                  control={<Radio />} 
                />
              </RadioGroup>
            </div>
          )
        }
        <div className={classes.prepare_actions}>
          {
            stepIndex > 0 ? <Button type="button" variant="outlined" color="primary" onClick={() => setStepIndex(stepIndex-1)}>이전</Button> : <></>
          }
          <Button type="button" variant="contained" color="primary" onClick={() => setStepIndex(stepIndex+1)}>다음</Button> 
        </div>
      </CardContent>
    </Card>
  )
}