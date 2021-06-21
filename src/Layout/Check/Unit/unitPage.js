import { Button, Container, makeStyles } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import React from 'react'
import { Route, Switch } from 'react-router';
import CheckContentComponent from './cn';
import CheckChapterVerseComponent from './cv';

export default function UnitPageComponent(props) {

  const useStyle = makeStyles(theme => ({
    root_unit: {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    content_unit : {
      flex: 90
    },
    moveButton : {
      flex: 5,
      minWidth: '0px',
      color: theme.palette.text.hint
    }
  }));
  const classes = useStyle();

  React.useEffect(() => {
    try {
      
    } catch (error) {
      console.error(error);
    } 
  }, [])
  return (
    <Container className={classes.root_unit} >

      <Button type="button" color="default" className={classes.moveButton}><ArrowBackIos /></Button>
      <div>
        <Switch>
          <Route path={`${props.params ? props.params.path : ''}/check/cv`} render={props => <CheckChapterVerseComponent {...props} />} />
          <Route path={`${props.params ? props.params.path : ''}/check/cn`} render={props => <CheckContentComponent {...props} />} />
        </Switch>
      </div>
      <Button type="button" color="default" className={classes.moveButton}><ArrowForwardIos /></Button>
    </Container>
  )
}