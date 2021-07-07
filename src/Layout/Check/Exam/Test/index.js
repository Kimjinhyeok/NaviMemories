import { AppBar, Button, Container, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import TimeProgress from '../timeProgress';
import CNQuestList from './cnQuestList';
import CVQuestList from './cvQuestList';

const DEF_Deduction = 6;
const DEF_Point = 100;
var deductions = {
  cv : new Array(5).fill(DEF_Deduction),
  cn : new Array(5).fill(DEF_Deduction)
}
export default function RecitationExam(props) {

  const LimitTime = 60*10;
  const propsState = props.location.state;
  const classes = makeStyles(theme => ({
    root_exam: {
      height: '100%'
    },
    container_exam: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    tabcontent: {
      height: '100%',
    },
    flowPanel: {
      maxHeight: 'calc(100% - 48px)',
      height: 'calc(100% - 48px)',
      overflowY: 'auto'
    },
    tabPanels: {
      height: '100%',
    },
    tabPanel: {
      height: '100%'
    },
    timeline : {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    closing: {
      marginBottom: theme.spacing(2),
      fontSize: '1.2em'
    }
  }))();

  const [Result, setResult] = React.useState([]);
  const [Point, setPoint] = React.useState(100);
  const [Source, setSource] = React.useState({
    cv : propsState.cardList.cv,
    cn : propsState.cardList.cn,
    themeOf242 : propsState.themeOf242,
  });
  const [TabIdx, setTabIdx] = React.useState(propsState.precedence == "cn" ? 0 : 1)

  React.useEffect(() => {
    
    setPoint(DEF_Point + (Source.themeOf242 ? 2 : 0));
    
  }, []);
  const addResultQuestion = function(question) {
    var resolvedList = Result;
    resolvedList.push(question);
    setResult(resolvedList);
  }
  const setDeduction = (props) => (index, value) => {
    deductions = {...deductions, [props] : [...deductions[props].slice(0, index), (value > DEF_Deduction ? DEF_Deduction : value), ...deductions[props].slice(index+1)]};
  }
  const setConfirm = function(deduction) {
    var resultPoint = Point - deduction;
    setPoint(resultPoint);
  }
  const closing = function() {
    console.log(deductions);

  }
  
  function TabPanel(props) {
    const { value, index, className, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-label={`full-width-tab-${index}`}
        className={className}
        {...other}>
      </div>
    )
  }
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  return (
    <Container maxWidth="md" className={classes.root_exam}>
      {/* <RecitationExamPrepareComponent setPrepare={setSource} {...props} /> */}
      <Container maxWidth="md" className={classes.container_exam}>
        <div className={classes.timeline}>
          <TimeProgress LimitTime={LimitTime}/>
        </div>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs
            value={TabIdx}
            onChange={(event, newVal) => { setTabIdx(newVal) }}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs cardList">
            <Tab label="본문" {...a11yProps(0)}></Tab>
            <Tab label="장절" {...a11yProps(1)}></Tab>
          </Tabs>
        </AppBar>
        <div className={classes.tabPanels}>
          <TabPanel value={TabIdx} index={0} className={classes.tabPanel}>
            <CNQuestList origins={Source.cn} themeOf242={Source.themeOf242} setAddResultQuestion={addResultQuestion} setResultDeduction={setDeduction("cn")} />
          </TabPanel>
          <TabPanel value={TabIdx} index={1} className={classes.tabPanel}>
            <CVQuestList origins={Source.cv} themeOf242={Source.themeOf242} setAddResultQuestion={addResultQuestion} setResultDeduction={setDeduction("cv")} />
          </TabPanel>
        </div>
        <Button className={classes.closing} type="button" variant="contained" color="secondary" onClick={closing}>종료</Button>
      </Container>
    </Container>
  )
} 