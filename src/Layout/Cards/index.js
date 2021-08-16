import { AppBar, Container, FormControl, FormGroup, InputLabel, makeStyles, MenuItem, Select, Tab, Tabs } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react'
import { useParams } from 'react-router';
import cookies from '../../Data/cookies';
import Http from '../../Utils/Http';
import CardListComponent from './CardList/list';
import CardSlideComponent from './CardSlide/slide';

export default function RecitationCardListComponent(props) {

  const useStyle = makeStyles((theme) => ({
    options : {
      flexDirection: 'row',
      marginTop : theme.spacing(1),
      '& > .MuiFormControl-root': {
        flex: 50
      }
    },
    tabcontent : {
      height : 'calc(100% - 50px)',
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

  const SortOption = {
    createAt : 'createAt',
    category : 'category',
    bible_code : 'bible_code'
  };
  const SortProperty = {
    createAt : 'create_at',
    category : 'series_code',
    bible_code : 'bible_code'
  }
  const classes = useStyle();
  const http = Http();
  const [value, setvalue] = React.useState(0);
  const originList = useRef([]);
  const category = Number(props.match.params.category);
  const { enqueueSnackbar } = useSnackbar();
  
  const handleChange = function (event, newValue) {
    setvalue(newValue);
  }

  const [cardlist, setCardList] = React.useState([]);
  const InitSlide = React.useRef(0);
  const [Options, setOptions] = React.useState({
    sort : category >= 500 ? SortProperty.createAt : SortProperty.category,
    filter : 'all',
  });

  React.useEffect(async () => {
    var location = props.location.pathname;
    var response = await http.get({query : `RC/${category}`});
    var recvCardList = response.data;

    originList.current = recvCardList;
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
      InitSlide.current = itemIndex;
    } catch (error) {
      console.error(error);
      enqueueSnackbar("암송 처리 도중 장애가 발생했습니다.", {variant : 'error'})
    }
  }

  const updateOptions = (property) => (event) => {
    let newOptions = {...Options, [property] : event.target.value};
    setOptions(newOptions);

    let sortType = "";
    switch(newOptions.sort) {
      case SortOption.createAt :
        sortType = SortProperty.createAt;
        break;
      case SortOption.category :
        sortType = SortProperty.category;
        break;
      case SortOption.bible_code :
        sortType = SortProperty.bible_code;
        break;
    }
    
    let cpList = originList.current.filter(item => {
      switch(newOptions.filter) {
        case 'all' :
          return true;
        case 'memorized':
          return item.passed;
        case 'non_memorized':
          return !item.passed;
      }
    });
    cpList.sort((a,b) => {
      return a[sortType] > b[sortType] ? 1 : (a[sortType] == b[sortType] ? 0 : -1)
    });

    setCardList(cpList);
  }
  return (
    <div aria-label="tabContent" className={classes.tabcontent}>
      <Container maxWidth="sm">
        <FormGroup className={classes.options}>
          <FormControl variant="standard">
            <InputLabel>정렬</InputLabel>
            <Select value={Options.sort} onChange={(e) => updateOptions('sort')(e)}>
              <MenuItem value={category >= 500 ? SortProperty.createAt : SortProperty.category}>{category >= 500 ? "등록순" : "시리즈순"}</MenuItem>
              <MenuItem value={SortProperty.bible_code}>성경순</MenuItem>
            </Select>
          </FormControl>
          {
            cookies.isLogin() ? 
              <FormControl variant="standard">
                <InputLabel>필터</InputLabel>
                <Select value={Options.filter} onChange={(e) => updateOptions('filter')(e)}>
                  <MenuItem value="all">전체</MenuItem>
                  <MenuItem value="memorized">암송</MenuItem>
                  <MenuItem value="non_memorized">미암송</MenuItem>
                </Select>
              </FormControl>
            :
              <></>

          }
        </FormGroup>
      </Container>
      {
      cardlist.length > 0 ?
        <>
          <div className={classes.flowPanel}>
            <div className={classes.tabPanels}>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <CardSlideComponent item={cardlist} initSlide={InitSlide.current} setInitSlide={(val) => InitSlide.current = val} updatePassed={updatePassed} {...props} />
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