import { Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { lightBlue, lime, teal } from '@mui/material/colors';
import React from 'react'
import BibleData from '../../../Data/bible';

export default function RecitationResult(props) {

  const classes = styled(theme => ({
    root_container : {
      display : 'flex',
      flexDirection: 'column'
    },
    header : {
      margin: '5vh auto',
      '& h4' : {
        margin: '5vh 0'
      },
      textAlign: 'center'
    },
    result_circle : {
      borderWidth: '1em',
      borderStyle: 'solid',
      borderRadius: '50%',
      width: '10em',
      height: '10em',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    questList : {
      borderWidth: '3px',
      borderStyle: 'solid',
      padding: theme.spacing(2),
      borderRadius: '15px',
      position: 'relative',
      '& > .quest_item' : {
        marginTop : theme.spacing(1),
        marginBottom : theme.spacing(1),
        padding : theme.spacing(2),
      },
      '& .theme' : {
        fontSize: '1.2em',
      },
      '& .cvn' : {
        padding : theme.spacing(1),      
        '& .cv': {
          marginTop : theme.spacing(0.5),
          marginBottom : theme.spacing(0.5)
        }
      },
    },
    questListTitle : {
      position: 'absolute',
      top: `-1em`,
      left: 0,
      right: 0,
      '& > div': {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: 'inherit'
      }
    },
    excellent : {
      backgroundColor : lightBlue[50],
      '& .title': {
        color : lightBlue[900]
      },
      '& div.circle, div.quest_list' : {
        borderColor : lightBlue[200],
        '& .quest_list_title': {
          backgroundColor : lightBlue[50],
          color : lightBlue[900]
        }
      },
      '& h2': {
        color : lightBlue[500],
      }
    },
    great : {
      backgroundColor : teal[50],
      '& .title': {
        color : teal[900]
      },
      '& div.circle, div.quest_list' : {
        borderColor : teal[200],
        '& .quest_list_title': {
          backgroundColor : teal[50],
          color : teal[900]
        }
      },
      '& h2': {
        color : teal[500]
      }
    },
    normal : {
      backgroundColor : lime[50],
      '& .title': {
        color : lime[900]
      },
      '& div.circle, div.quest_list' : {
        borderColor : lime[200],
        '& .quest_list_title': {
          backgroundColor : lime[50],
          color : lime[900]
        }
      },
      '& h2': {
        color : lime[500]
      }
    }
  }))()
  const {point, deductions, quest} = props.location.state;
  const [QuestList, setQuestList] = React.useState([]);
  const returnClass = function() {
    if(point >= 98) {
      return classes.excellent;
    } else if(point >= 92) {
      return classes.great;
    } else {
      return classes.normal;
    }
  }
  const printResult = function() {
    if(point >= 98) {
      return "탁월";
    } else if(point >= 92) {
      return "우수";
    } else {
      return "보통";
    }
  }
  const getQuests = function(property) {
    let list = [];
    for(var i in quest[property]) {
      list.push({q : quest[property][i], v : deductions[property][i]});
    }
    return list;
  }

  React.useEffect(() => {
    let cv = getQuests('cv');
    let cn = getQuests('cn');
  
    setQuestList(cn.concat(cv));
  }, [])

  const getBibleName = function(bibleInfo) {
    let bible = BibleData.find(item => item.bible_code == bibleInfo.bible_code);
    return bible.bible_name;
  }
  const pirntQuestAndResult = function(source, index) {

    let item = source.q;
    let v = source.v
    return (
      <Paper elevation={1} key={index} className="quest_item">
        <div className="theme">{item.theme}</div>
        <div className="cvn">
          <div className="cv">
            <span>{getBibleName(item)}</span>&nbsp;
            <span>{item.chapter}</span>&nbsp;<span>:</span>&nbsp;<span>{item.f_verse}</span><span>{item.l_verse ? ` ~ ${item.l_verse}` : ""}</span>
          </div>
          <div>
            {item.content}
          </div>
        </div>
      </Paper>
    )
  }
  return (
    <Container className={`${classes.root_container} ${returnClass()}`} maxWidth="sm">
      <div className={classes.header}>
        <Typography variant="h4" className="title">테스트 결과</Typography>
        <div className={classes.result_circle + ' circle'}>
          <Typography variant="h2" component="h2">{printResult()}</Typography>
        </div>
      </div>
      <div className={classes.questList + " quest_list"}>
        <div className={classes.questListTitle}>
          <Typography variant="h5" component="div" className="quest_list_title">출제 구절 목록</Typography>
        </div>
        {QuestList.map((item, index) => pirntQuestAndResult(item, index))}
      </div>
    </Container>
  )
}