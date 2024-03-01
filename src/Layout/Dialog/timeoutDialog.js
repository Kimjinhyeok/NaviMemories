import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { styled } from '@mui/system';
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

  const {action, title, message, timerTime, open} = props;
  const [timer, setTimer] = React.useState(timerTime);

  useInterval(() => {setTimer(timer - 1)}, open && (timer != 0) ? 1000 : null);
  
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
        <DialogContentText className={'text-center'}>{timer}초 후 이동합니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color='primary' onClick={action} fullWidth={true}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}