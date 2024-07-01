import { AppBar, Divider, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import Http from '../../Utils/Http';
import CardListComponent from './CardList/list';
import CardSlideComponent from './CardSlide/slide';
import CardUsecase from '../../Usecase/card/card';
import CardArrangeMenu from './menu/menu';

export default function RecitationCardListComponent(props) {
 
  const http = Http();
  const [value, setvalue] = React.useState(0);
  const originList = useRef([]);
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
  const InitSlide = React.useRef(0);

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
        originList.current = res;
        setCardList(res)
    
        navigate(pathname);
      }
    })()
  }, [pathname])
  
  const updateCardSort = (sortFunction) => {
    const cpList = originList.current.sort(sortFunction);
    setCardList(Array.from(cpList));
  }
  const updateCardFilter = (filterFunction) => {
    const cpList = originList.current.filter(filterFunction);
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

  return (
    <div aria-label="tabContent" className={'h-full flex flex-col pt-4'}>
      <CardArrangeMenu category={category} updateSort={updateCardSort} updateFilter={updateCardFilter} />
      <Divider sx={{ marginTop: '8px' }}/>
      {
        cardlist.length > 0 
        ?
          <>
            <div className='flex-1 flex flex-col max-h-[100vh] overflow-hidden pt-2'>
              <div className='flex-1'>
                <TabPanel value={value} index={0} className={'h-full'}>
                  <CardSlideComponent item={cardlist} initSlide={InitSlide.current} setInitSlide={(val) => InitSlide.current = val} updatePassed={updatePassed} {...props} />
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