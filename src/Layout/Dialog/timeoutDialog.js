import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core'
import React from 'react'
import useInterval from '../../Utils/useInterval';
/**
 * @typedef TimeoutDialogProps
 * @property {Function} action
 * @property {String} title
 * @property {String} message
 * @property {Number} timerTime
 * @property {Boolean} open
 * @param {TimeoutDialogProps} props 
 * @returns 
 */
export default function TimeoutDialog(props) {

  const classes = makeStyles(theme => ({
    dialog_text: {
      textAlign: 'center'
    },
    action_button: {
      width: '100%'
    }
  }))();
  const {action, title, message, timerTime, open} = props;
  const [timer, setTimer] = React.useState(timerTime);

  useInterval(() => {setTimer(timer - 1)}, timer != 0 ? 1000 : null);

  React.useEffect(() => {
    if(timer === 0) {
      action();
    }
  }, [timer])
  return (
    <Dialog 
      maxWidth="md"
      open={open}
      disableBackdropClick={true}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <DialogContentText className={classes.dialog_text}>{timer}초 후 이동합니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={action} className={classes.action_button}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}