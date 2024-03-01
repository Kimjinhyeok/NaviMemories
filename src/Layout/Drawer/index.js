import React, { useContext, useState } from 'react'
import { Collapse, Divider, List, ListItem, Switch, ListItemSecondaryAction, ListItemText, ListSubheader, Drawer, Box, ListItemButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Categories from '../../Data/categories'
import DrawerNaviCategoriesComponent from './drawerNaviCategories'
import Cookie from '../../Data/cookies';
import { Context, UserConfigAction } from '../../Utils/Context'
import { useNavigate } from 'react-router'

export default function DrawerMenuComponent(props) {
  const drawerWidth = props.drawerWidth;
  const navigator = useNavigate();
  const classes = props.classes;
  const [opened, setCollapseOpened] = useState({ recitation: false, cardManage: false, checking: false });

  const { state: { version: BibleVersion }, dispatch } = useContext(Context);
  const setOpen = props.setOpen;
  const isLogin = props.isLogin;

  const handleOpenedClick = (property) => {
    setCollapseOpened({ ...opened, [property]: !opened[property] });
  }
  const handleBibleVersion = () => {
    let value = !BibleVersion;
    Cookie.set('bibleVersion', value);
    dispatch({ type: UserConfigAction, payload: value })
  }

  const [categories, setCategories] = useState([]);
  const [subCt, setSubCt] = useState(null);

  React.useEffect(() => {
    const subCtClosed = Categories.map(_ => false);
    setSubCt(subCtClosed);
    setCategories(Categories);
  }, [])

  const handleClose = () => {
    setOpen(false);
    Cookie.set('collapseDrawer', false)
  }
  return (
    <Drawer
      anchor='left'
      open={props.open}
      onClose={handleClose}
    >
      <Box
        minWidth={'260px'}
      >
        <List>
          <ListItemButton onClick={() => handleOpenedClick('recitation')}>
            <ListItemText>암송 읽기</ListItemText>
            {opened.recitation ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={opened.recitation} unmountOnExit>
            <List>
              {categories.map((ct, idx) => {
                return (
                  <DrawerNaviCategoriesComponent key={idx} category={ct} classes={classes} isLogin={isLogin} {...props} />
                )
              })}
            </List>
          </Collapse>
          <Divider />
          {/**
           ********************************  암송 점검  *******************************
          */}
          <ListItemButton onClick={() => { handleOpenedClick('checking') }}>
            <ListItemText>암송 점검</ListItemText>
            {opened.checking ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={opened.checking} unmountOnExit>
            <List>
              <ListItemButton key='암송 본문 체크' onClick={() => { navigator('/check/cn') }} sx={{marginLeft: '8px', width: 'calc(100% - 8px) !important'}}>
                <ListItemText primary="암송 본문 체크" />
              </ListItemButton>
              <ListItemButton key='암송 구절 체크' onClick={() => { navigator('/check/cv') }} sx={{marginLeft: '8px', width: 'calc(100% - 8px) !important'}}>
                <ListItemText primary="암송 구절 체크" />
              </ListItemButton>
              <ListItemButton key='암송 모의 테스트' onClick={() => { navigator('/test/v_prepare') }} sx={{marginLeft: '8px', width: 'calc(100% - 8px) !important'}}>
                <ListItemText primary="암송 모의 테스트" />
              </ListItemButton>
              {
                isLogin ?
                  <ListItemButton key='암송 실기 테스트' onClick={() => { navigator('/test/prepare') }} sx={{marginLeft: '8px', width: 'calc(100% - 8px) !important'}}>
                    <ListItemText primary="암송 실기 테스트" />
                  </ListItemButton>
                  :
                  <></>
              }
            </List>
          </Collapse>
          <Divider />

          {/**
           ********************************  내 카드 관리  *******************************
          */}
          {
            isLogin ?
              <>
                <ListItemButton onClick={() => { handleOpenedClick('cardManage') }}>
                  <ListItemText>내 카드 관리</ListItemText>
                  {opened.cardManage ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={opened.cardManage} unmountOnExit>
                  <List>
                    <ListItemButton key='OYO 입력' onClick={() => { navigator('/oyo/template') }} sx={{marginLeft: '8px', width: 'calc(100% - 8px)'}}>
                      <ListItemText primary="OYO 입력" />
                    </ListItemButton>
                    <ListItemButton key='암송카드 관리' onClick={() => { navigator('/oyo/manage') }} sx={{marginLeft: '8px', width: 'calc(100% - 8px)'}}>
                      <ListItemText primary="암송카드 관리" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <Divider />
              </>
              :
              <></>

          }
        </List>
        <List subheader={<ListSubheader>성경 번역</ListSubheader>}>
          <ListItemButton>
            <ListItemText id="switch-list-label-wifi" primary={BibleVersion ? "개정개역" : "개역한글"} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleBibleVersion}
                checked={BibleVersion}
                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  )
}