import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router';

export default function DrawerNaviCategoriesComponent({category, isLogin=false}) {

  const navigator = useNavigate();
  const [open, setopen] = React.useState(false)

  const moveToCategory = (code) => {
    navigator(`recitation/${code}`);
  }
  const topNaviComponent = () => {
    if(category.series_code == 500) {
      if(!isLogin) return <></>;
    }
    if (!category.children || category.children.length <= 0) {
      return (
        <ListItemButton  key={category.series_code} onClick={() => {moveToCategory(category.series_code)}} sx={{ marginLeft : '8px', width: 'calc(100% - 8px)'}}>
          <ListItemText primary={category.series_name} />
        </ListItemButton>
      )
    } else {
      return (
        <>
          <ListItemButton  key={category.series_code} onClick={() => { setopen(!open) }} sx={{ marginLeft : '8px', width: 'calc(100% - 8px)'}}>
            <ListItemText primary={category.series_name} />
            {category.children && category.children.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : <></>}
          </ListItemButton>
          <Collapse in={open} unmountOnExit>
            <List>
              <ListItemButton  key={category.series_code+'%'} onClick={()=>{moveToCategory(category.series_code)}} sx={{marginLeft: '16px', width: 'calc(100% - 16px)'}}>
                <ListItemText primary={category.series_name + ' 전체'} />
              </ListItemButton>
              {category.children.map(item => {
                return (
                  <ListItemButton  key={item.series_code} onClick={()=>{moveToCategory(item.series_code)}} sx={{marginLeft: '16px', width: 'calc(100% - 16px)'}}>
                    <ListItemText primary={item.category} />
                  </ListItemButton>
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