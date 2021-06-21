import React from 'react'
import { Route, Switch } from 'react-router';
import { Button, Container, makeStyles } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import {red, blue, lightBlue, grey} from '@material-ui/core/colors'
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
    },
    root_checking : {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    shortName: {
      marginRight: '10px'
    },
    row_part: {
      display: 'flex',
      flexDirection: 'row',
      '& .MuiFormControl-root': {
        flex: 20
      },
      '& .MuiFormControl-root:not(:last-child)': {
        marginRight: '10px'
      },
      '& .MuiAutocomplete-root': {
        flex: 30,
        marginRight: '10px'
      }
    },
    form_checking: {
      margin: 'auto auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& > div': {
        margin: '10px 0'
      },
      '& input:read-only' : {
        backgroundColor: theme.palette.action.hover
      }
    },
    content_checking: {
      flex: 1,
      backgroundColor: theme.palette.action.hover
    },
    succeed: { backgroundColor: blue[50], '& input': {color : theme.palette.info.main}},
    failed: { backgroundColor: red[50], '& input': {color : theme.palette.error.main}},
    action_button: {
      display: 'flex',
      flexDirection: 'column',
      '& button': {
        marginTop: '10px'
      }
    },
    content_result: {
      height: '12vh',
      paddingTop: '18.5px',
      paddingBottom: '18.5px',
      paddingLeft: '14px',
      paddingRight: '14px',
      border: '1px solid',
      borderRadius: '4px',
      borderColor: theme.palette.action.disabled,
      overflowY: 'auto'
    },
    hide : {
      display : 'none'
    },
    correct : {
      backgroundColor: lightBlue[50],
    },
    omitted : {
      backgroundColor: grey[50],
      color: grey[500],
      textDecoration: 'line-through',
    },
    incorrect : {
      backgroundColor: red[50],
      color: red[500]
    },
  }));
  const classes = useStyle();

  React.useEffect(() => {
    try {
      
    } catch (error) {
      console.error(error);
    } 
  }, [])
  
  const [origin] = React.useState({
    theme : "구원의 확신",
    bible_code: 62,
    chapter: 5,
    f_verse: 11,
    l_verse: 12,
    content : "또 증거는 이것이니 하나님이 우리에게 영생을 주신 것과 이 생명이 그의 안에 있는 그것이니라 아들이 있는 자에게는 생명이 있고 하나님의 아들이 없는 자에게는 생명이 없느니라",
  });

  return (
    <Container className={classes.root_unit} >

      <Button type="button" color="default" className={classes.moveButton}><ArrowBackIos /></Button>
      <div>
        <Switch>
          <Route path={`${props.params ? props.params.path : ''}/check/cv`} render={props => <CheckChapterVerseComponent classes={classes} origin={origin} {...props} />} />
          <Route path={`${props.params ? props.params.path : ''}/check/cn`} render={props => <CheckContentComponent classes={classes} origin={origin} {...props} />} />
        </Switch>
      </div>
      <Button type="button" color="default" className={classes.moveButton}><ArrowForwardIos /></Button>
    </Container>
  )
}