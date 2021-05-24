import { CircularProgress, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

export default function LoadingLayer(props) {

  const useStyle = makeStyles((theme) => ({
    root : {
      display: 'flex',
      flexGrow: 1,
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circular: {
      margin: theme.spacing(5)
    }
  }))
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <CircularProgress size="10em" className={classes.circular}/>
      <Typography variant="h2" component="div">Loading...</Typography>
    </div>
  )
}