import { AppBar, Container, makeStyles, Tab, Tabs } from '@material-ui/core';
import React from 'react'
import CardListComponent from './CardList/list';
import CardSlideComponent from './CardSlide/list';

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
  const [value, setvalue] = React.useState(0);
  
  const handleChange = function (event, newValue) {
    setvalue(newValue);
  }

  const [cardlist, setCardList] = React.useState([])

  React.useEffect(async () => {
    var location = props.location.pathname;
    var response = await fetch(`/mock_memories.json`);
    var recvCardList = await response.json();
    setCardList(recvCardList)

    props.history.push(location);
  }, [])
  
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
    <Container aria-label="tabContent" className={classes.tabcontent}>
      {
      cardlist.length > 0 ?
        <>
          <div className={classes.flowPanel}>
            <div className={classes.tabPanels}>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <CardSlideComponent item={cardlist} {...props} />
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                <CardListComponent item={cardlist} {...props} />
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
    </Container>
  )
}