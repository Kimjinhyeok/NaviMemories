import { Box, LinearProgress, makeStyles, Typography, withStyles } from '@material-ui/core';
import { amber, red, lightBlue, grey } from '@material-ui/core/colors'
import React from 'react'

const lineStyles = (theme, props) => ({
  root: {
    height: '1rem',
    borderRadius: 5,
    backgroundColor: grey[200],
    '&.emergency .MuiLinearProgress-barColorPrimary': {
      backgroundColor: red[800]
    },
    '&.warning .MuiLinearProgress-barColorPrimary': {
      backgroundColor: amber[500]
    },
    '&.normal .MuiLinearProgress-barColorPrimary': {
      backgroundColor: lightBlue[300]
    }
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
function TimeProgress(props) {

  const [remainTime, setRemainTime] = React.useState({min : 0, second : 0, time: 0});
  const [value, setValue] = React.useState(0);
  const LimitTime = props.LimitTime;
  const classes = props.classes;
  function startTimer() {
    var time = LimitTime; // 10 min

    var handler = setInterval(() => {
      let min = parseInt( time / 60, 10);
      let second = parseInt( time % 60, 10);

      min = min < 10 ? "0" + min : min;
      second = second < 10 ? "0" + second : second;
      
      if( --time <= 0 ) {
        clearInterval(handler);
      }
      setRemainTime({min, second, time});
      setValue(100 - ((remainTime.time / LimitTime) * 100));
      
    }, 1000)
    
  }
  // startTimer();
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          value={value}
          classes={classes}
          className={(value > 90 ? 'emergency' : (value > 70 ? 'warning' : 'normal'))} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{remainTime.min}:{remainTime.second}</Typography>
      </Box>
    </Box>

  )
}
export default withStyles(lineStyles)(TimeProgress);