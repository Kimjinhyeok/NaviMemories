import { Collapse, List, ListItem, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React from 'react'

export default function DrawerNaviCategoriesComponent(props) {

  const {history, category, classes, isLogin} = props;
  const [open, setopen] = React.useState(false)
  const moveToCategory = function (code) {
    history.push(`/recitation/${code}`)
  }
  const topNaviComponent = function () {
    if(category.series_code == 500) {
      if(!isLogin) return <></>;
    }
    if (!category.children || category.children.length <= 0) {
      return (
        <ListItem button key={category.series_code} onClick={() => {moveToCategory(category.series_code)}} sx={{ marginLeft : '8px', width: 'calc(100% - 8px)'}}>
          <ListItemText primary={category.series_name} />
        </ListItem>
      )
    } else {
      return (
        <>
          <ListItem button key={category.series_code} onClick={() => { setopen(!open) }} sx={{ marginLeft : '8px', width: 'calc(100% - 8px)'}}>
            <ListItemText primary={category.series_name} />
            {category.children && category.children.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : <></>}
          </ListItem>
          <Collapse in={open} unmountOnExit>
            <List>
              <ListItem button key={category.series_code+'%'} onClick={()=>{moveToCategory(category.series_code)}} sx={{marginLeft: '16px', width: 'calc(100% - 16px)'}}>
                <ListItemText primary={category.series_name + ' 전체'} />
              </ListItem>
              {category.children.map(item => {
                return (
                  <ListItem button key={item.series_code} onClick={()=>{moveToCategory(item.series_code)}} sx={{marginLeft: '16px', width: 'calc(100% - 16px)'}}>
                    <ListItemText primary={item.category} />
                  </ListItem>
                )
              })}
            </List>
          </Collapse>
        </>
      )
    }
  }
  return (topNaviComponent())
}