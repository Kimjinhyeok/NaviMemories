import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * @typedef AlertDialogProps
 * @property {Function} agreeAction
 * @property {Function} disagreeAction
 * @property {String} title
 * @property {String} message
 * @property {Boolean} open
 */
/**
 * 
 * @param {AlertDialogProps} props 
 * @returns 
 */
export default function AlertDialog(props) {
  const { title, message } = props;
  const { agreeAction, disagreeAction } = props;
  
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {  disagreeAction(); handleClose()}} color="primary">
            아니요
          </Button>
          <Button onClick={() => {  agreeAction(); handleClose()}} color="primary" autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}