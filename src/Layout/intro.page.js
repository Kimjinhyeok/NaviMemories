import { Container, makeStyles } from '@material-ui/core'
import React from 'react'

export default function IntroPageComponent(props) {

  const classes = makeStyles((theme) => ({
    intro_root : {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    intro_title : {
      marginTop: 'auto',
      marginBottom: 'auto',
      width: '100%',
      textAlign: 'center'
    }
  }))();
  return (
    <Container maxWidth="md" className={classes.intro_root}>
      <div className={classes.intro_title}>
        <h3>Test Page</h3>
      </div>
    </Container>
  )
}