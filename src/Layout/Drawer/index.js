import React, {useState} from 'react'
import { Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { arrayCategories, Categories } from '../../Data/categories'
import DrawerNaviCategoriesComponent from './drawerNaviCategories'

export default function DrawerMenuComponent(props) {


  const history = props.history;
  const classes = props.classes;
  const [opened, setCollapseOpened] = useState({recitation: false, cardManage : false});
  const setOpen = props.setOpen;

  const handleOpenedClick = (property) => {
      setCollapseOpened({...opened, [property] : !opened[property]})
  }

  const [categories, setCategories] = useState([]);
  const [subCt, setSubCt] = useState(null);

  React.useEffect(async () => {
      var categories = await Categories.getCategories();
      var sortedCategories = arrayCategories(categories);
      var subCtClosed = sortedCategories.map(_ => false);
      setSubCt(subCtClosed);
      setCategories(sortedCategories);
  }, [])  
  
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={props.open}
      anchor="left"
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      <List>
        <ListItem button onClick={() => handleOpenedClick('recitation')}>
          <ListItemText>암송</ListItemText>
          {opened.recitation ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={opened.recitation} unmountOnExit>
          <List>
            {categories.map((ct, idx) => {
              return (
                <DrawerNaviCategoriesComponent key={idx} category={ct} classes={classes} {...props} />
              )
            })}
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={() => { handleOpenedClick('cardManage') }}>
          <ListItemText>내 카드 관리</ListItemText>
          {opened.cardManage ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={opened.cardManage} unmountOnExit>
          <List>
            <ListItem button key='OYO 입력' onClick={() => {history.push('/template')}}>
              <ListItemText primary="OYO 입력" />
            </ListItem>
            <ListItem button key='암송카드 관리' onClick={() => {history.push('/')}}>
              <ListItemText primary="암송카드 관리" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}