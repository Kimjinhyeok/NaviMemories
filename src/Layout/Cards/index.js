import { AppBar, Divider, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import Http from '../../Utils/Http';
import CardListComponent from './CardList/list';
import CardSlideComponent from './CardSlide/slide';
import CardUsecase from '../../Usecase/card/card';
import CardArrangeMenu from './menu/menu';
import FisherYatesShuffle from '../../Utils/shuffle';

export default function RecitationCardListComponent(props) {
 
  const http = Http();
  const [value, setvalue] = React.useState(0);
  const ref = useRef({
    originList : [],
    InitSlide : 0,
    sortType : 'category'
  })
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const {category = '00'} = params;
  const { enqueueSnackbar } = useSnackbar();
  
  const handleChange = function (event, newValue) {
    setvalue(newValue);
  }

  const [cardlist, setCardList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await CardUsecase.getCardList(category);
      if(res instanceof Error) {
        enqueueSnackbar(res.message, {
          variant: "warning",
        });
      } else if(res instanceof Array && res.length == 0) { // OYO 카드이며 내용이 없을 때
        enqueueSnackbar('저장된 OYO 카드가 없습니다.', {variant : 'warning'});
        navigate('/');
      } else {
        ref.current.originList = res;
        setCardList(getSortedList(res, ref.current.sortType))
    
        navigate(pathname);
      }
    })()
  }, [pathname])
  
  const getSortedList = (array=[], sortType) => {
    if(sortType == 'random') {
      return FisherYatesShuffle(array);
    } else {
      const sortFnc = (a,b) => {
        return a[sortType] > b[sortType] ? 1 : (a[sortType] == b[sortType] ? 0 : -1)
      }
  
      return array.sort(sortFnc);
    }
  }
  const updateSortType = (sortType) => {

    const CardList = getSortedList(ref.current.originList, sortType);
    ref.current.sortType = sortType;
    setCardList(Array.from(CardList));
  }
  const updateCardFilter = (filterFunction) => {
    const cpList = ref.current.originList.filter(filterFunction);
    setCardList(Array.from(cpList));
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

  async function updatePassed(event, memory) {
    try {
      const checked = event.target.checked;
      const { card_num, series_code } = memory;
      await http.put({
        query: `RC/passed/${series_code}/${card_num}`, 
        data: {
          recitation_status : checked
      }});

      const itemIndex = cardlist.findIndex(item => item.series_code == memory.series_code && item.card_num == memory.card_num);
      setCardList([...cardlist.slice(0, itemIndex), {...memory, passed : checked}, ...cardlist.slice(itemIndex+1)]);
      ref.current.InitSlide = itemIndex;
    } catch (error) {
      console.error(error);
      enqueueSnackbar("암송 처리 도중 장애가 발생했습니다.", {variant : 'error'})
    }
  }

  return (
    <div aria-label="tabContent" className={'h-full flex flex-col pt-4'}>
      <CardArrangeMenu category={category} updateSort={updateSortType} updateFilter={updateCardFilter} />
      <Divider sx={{ marginTop: '8px' }}/>
      {
        cardlist.length > 0 
        ?
          <>
            <div className='flex-1 flex flex-col max-h-[100vh] overflow-hidden pt-2'>
              <div className='flex-1'>
                <TabPanel value={value} index={0} className={'h-full'}>
                  <CardSlideComponent item={cardlist} initSlide={ref.current.InitSlide} setInitSlide={(val) => ref.current.InitSlide = val} updatePassed={updatePassed} {...props} />
                </TabPanel>
                <TabPanel value={value} index={1} className='h-full max-h-[calc(100vh-(48px*2+64px))] overflow-y-auto'>
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
                aria-label="full width tabs cardList"
              >
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