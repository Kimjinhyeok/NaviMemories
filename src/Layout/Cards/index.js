import { AppBar, Container, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react'
import Http from '../../Utils/Http';
import CardListComponent from './CardList/list';
import CardSlideComponent from './CardSlide/slide';

export default function RecitationCardListComponent(props) {

  const useStyle = makeStyles((theme) => ({
    tabcontent : {
      height : '100%',
    },
    flowPanel : {
      maxHeight : 'calc(100% - 48px)',
      height: 'calc(100% - 48px)',
      overflowY : 'auto'
    },
    tabPanels : {
      height : '100%',
    },
    tabPanel : {
      height: '100%'
    }
  }));
  const classes = useStyle();
  const http = Http();
  const [value, setvalue] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  
  const handleChange = function (event, newValue) {
    setvalue(newValue);
  }

  const [cardlist, setCardList] = React.useState([])
  const [InitSlide, setInitSlide] = React.useState(0)

  React.useEffect(async () => {
    var location = props.location.pathname;
    var code = props.match.params.code;
    var response = await http.get({query : `RC/${code}`});
    var recvCardList = response.data;
    setCardList(recvCardList)

    props.history.push(location);
  }, [props.location.pathname])
  
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

  async function updatePassed(event, memory) {
    try {
      var checked = event.target.checked;
      var { card_num, series_code } = memory;
      await http.put({
        query: `RC/passed/${series_code}/${card_num}`, 
        data: {
          recitation_status : checked
      }});

      var itemIndex = cardlist.findIndex(item => item.series_code == memory.series_code && item.card_num == memory.card_num);
      setCardList([...cardlist.slice(0, itemIndex), {...memory, passed : checked}, ...cardlist.slice(itemIndex+1)]);
      setInitSlide(itemIndex);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("암송 처리 도중 장애가 발생했습니다.", {variant : 'error'})
    }
  }
  return (
    <div aria-label="tabContent" className={classes.tabcontent}>
      {
      cardlist.length > 0 ?
        <>
          <div className={classes.flowPanel}>
            <div className={classes.tabPanels}>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <CardSlideComponent item={cardlist} initSlide={InitSlide} updatePassed={updatePassed} {...props} />
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                <CardListComponent item={cardlist} updatePassed={updatePassed} {...props} />
              </TabPanel>
            </div>
          </div>
          <AppBar position="static"  color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs cardList">
              <Tab label="카드형" {...a11yProps(0)}></Tab>
              <Tab label="목록형" {...a11yProps(1)}></Tab>
            </Tabs>
          </AppBar>
        </>
        : <></>
    }
    </div>
  )
}