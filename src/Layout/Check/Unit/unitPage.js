import React from 'react'
import { Route, Switch } from 'react-router';
import { Button, Container, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos,  ArrowRightAlt, Shuffle } from '@material-ui/icons'
import {red, blue, lightBlue, grey} from '@material-ui/core/colors'
import CheckContentComponent from './cn';
import CheckChapterVerseComponent from './cv';
import CategorySelect from '../../categorySelect';
import Http from '../../../Utils/Http';

const InitialOrigin = {
  theme : "",
  bible_code: 0,
  chapter: 0,
  f_verse: 0,
  l_verse: 0,
  content : "",
}
export default function UnitPageComponent(props) {

  const http = Http();
  const useStyle = makeStyles(theme => ({
    root_unit: {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    area_content: {
      display: 'flex',
      flexDirection: 'column',
    },
    content_options: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      '& > *': {
        maxWidth: '33%',
      },
      '& > * .MuiFormControlLabel-label' : {
        display : 'flex'
      }
    },
    options_select: {
      width: '33%'
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
      borderType: '1px solid',
      borderTypeRadius: '4px',
      borderTypeColor: theme.palette.action.disabled,
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

  const [options, setoptions] = React.useState({
    series : '200',
    orderType : 'stright',
    version : 'nkrv',
    index : 0,
  })

  const [origin, setOrigin] = React.useState(InitialOrigin);
  const [cardList, setCardList] = React.useState([]);
  React.useEffect(async () => {
    try {
      var res = await http.get({
        query: `RC/${options.series}`, 
        data : {
          version : options.version
        }
      });
      var recitationList = res.data;

      setCardList(recitationList);
      var item = recitationList[options.index];
      setOrigin({
        theme : item.theme,
        bible_code : item.bible_code,
        content : item.content,
        chapter : item.chapter,
        f_verse : item.f_verse,
        l_verse : item.l_verse,
      })
    } catch (error) {
      console.error(error);
    } 
  }, [])
  

  return (
    <Container className={classes.root_unit} >

      <Button type="button" color="default" className={classes.moveButton} title="이전 문제"><ArrowBackIos /></Button>
      <div className={classes.area_content}>
        <div className={classes.content_options}>
          <div className={classes.options_select}><CategorySelect value={options.series} onChange={(event) => {setoptions({...options, series: event.target.value}); console.log(event.target.value)}}/> </div>
          <FormControl>
            <FormLabel component="legend">진행 순서</FormLabel>
            <RadioGroup row={true} value={options.orderType} onChange={(event) => {setoptions({...options, orderType: event.target.value})}} >
              <FormControlLabel value="stright" control={<Radio />} label={<ArrowRightAlt />} title="시리즈 순서" />
              <FormControlLabel value="random" control={<Radio />} label={<Shuffle />} title="무작위" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel component="legend">역본</FormLabel>
            <RadioGroup row={true} value={options.version}>
              <FormControlLabel value="hrv" control={<Radio />} label="개역한글"></FormControlLabel>
              <FormControlLabel value="nkrv" control={<Radio />} label="개정개역"></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </div>
        <Switch>
          <Route path={`${props.params ? props.params.path : ''}/check/cv`} render={props => <CheckChapterVerseComponent classes={classes} origin={origin} {...props} />} />
          <Route path={`${props.params ? props.params.path : ''}/check/cn`} render={props => <CheckContentComponent classes={classes} origin={origin} {...props} />} />
        </Switch>
      </div>
      <Button type="button" color="default" className={classes.moveButton} title="다음 문제"><ArrowForwardIos /></Button>
    </Container>
  )
}