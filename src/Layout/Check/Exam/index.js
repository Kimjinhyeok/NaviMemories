import { AppBar, Box, Button, Container, LinearProgress, makeStyles, Tab, Tabs, Typography, withStyles } from '@material-ui/core'
import { TabPanel } from '@material-ui/lab';
import React from 'react'
import TimeProgress from './timeProgress';
import CNQuestList from './Layer/cnQuestList';
import RecitationExamPrepareComponent from './Prepare/prepare'
import CVQuestList from './Layer/cvQuestList';

const DEF_Deduction = 6;
var deductions = {
  cv : new Array(5).fill(DEF_Deduction),
  cn : new Array(5).fill(DEF_Deduction)
}
export default function RecitationExam(props) {

  const LimitTime = 60*10;
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
  const [Result, setResult] = React.useState([]);
  const [Point, setPoint] = React.useState(100);
  const [Source, setSource] = React.useState({
    cn: [
      {
        "series_code": 240,
        "bible_code": 44,
        "theme": "세계비전",
        "chapter": 1,
        "f_verse": 8,
        "l_verse": 0,
        "content": "오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라 "
      },
      {
        "series_code": 250,
        "bible_code": 62,
        "theme": "사랑",
        "chapter": 3,
        "f_verse": 18,
        "l_verse": 0,
        "content": "자녀들아 우리가 말과 혀로만 사랑하지 말고 행함과 진실함으로 하자 "
      },
      {
        "series_code": 220,
        "bible_code": 49,
        "theme": "선행으로 구원받지 못함",
        "chapter": 2,
        "f_verse": 8,
        "l_verse": 9,
        "content": "너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라 행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라 "
      },
      {
        "series_code": 310,
        "bible_code": 62,
        "theme": "영생이 있음을 앎",
        "chapter": 5,
        "f_verse": 13,
        "l_verse": 0,
        "content": "내가 하나님의 아들의 이름을 믿는 너희에게 이것을 쓰는 것은 너희로 하여금 너희에게 영생이 있음을 알게 하려 함이라 "
      },
      {
        "series_code": 500,
        "bible_code": 58,
        "theme": "",
        "chapter": 13,
        "f_verse": 6,
        "l_verse": 0,
        "content": "그러므로 우리가 담대히 말하되 주는 나를 돕는 분이시니 사람이 내게 무엇을 행하든지 내가 두려워하지 아니하리라 하노라"
      },
    ],
    cv: [
      {
        "series_code": 210,
        "bible_code": 43,
        "theme": "그리스도께 순종",
        "chapter": 14,
        "f_verse": 21,
        "l_verse": 0,
        "content": "나의 계명을 지키는 자라야 나를 사랑하는 자니 나를 사랑하는 자는 내 아버지께 사랑을 받을 것이요 나도 그를 사랑하여 그에게 나를 나타내리라 "
      },
      {
        "series_code": 230,
        "bible_code": 50,
        "theme": "공급",
        "chapter": 4,
        "f_verse": 19,
        "l_verse": 0,
        "content": "나의 하나님이 그리스도 예수 안에서 영광 가운데 그 풍성한 대로 너희 모든 쓸 것을 채우시리라 "
      },
      {
        "series_code": 230,
        "bible_code": 60,
        "theme": "평안",
        "chapter": 5,
        "f_verse": 7,
        "l_verse": 0,
        "content": "너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라 "
      },
      {
        "series_code": 310,
        "bible_code": 49,
        "theme": "말씀에 근거한 확신",
        "chapter": 1,
        "f_verse": 13,
        "l_verse": 0,
        "content": "그 안에서 너희도 진리의 말씀 곧 너희의 구원의 복음을 듣고 그 안에서 또한 믿어 약속의 성령으로 인치심을 받았으니 "
      },
      {
        "series_code": 500,
        "bible_code": 19,
        "theme": "",
        "chapter": 37,
        "f_verse": 16,
        "l_verse": 0,
        "content": "한 의로운 사람의 적은 소유가 많은 사악한 자들의 풍부한 재물보다 더 나으니"
      }
    ],
    precedence: "cn",
    themeOf242: false
  });
  const [TabIdx, setTabIdx] = React.useState(0)

  React.useEffect(() => {
    
    if(Source.themeOf242) {
      setPoint(102);
    }

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