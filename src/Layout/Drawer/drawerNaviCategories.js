import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react'

export default function DrawerNaviCategoriesComponent(props) {

  const {history, category, classes} = props;
  const [open, setopen] = React.useState(false)
  const moveToCategory = function (code) {
    history.push(`/recitation/${code}`)
  }
  const topNaviComponent = function () {
    if (!category.children || category.children.length <= 0) {
      return (
        <ListItem button key={category.series_code} onClick={() => {moveToCategory(category.series_code)}} className={classes.nested_1}>
          <ListItemText primary={category.series_name} />
        </ListItem>
      )
    } else {
      return (
        <>
          <ListItem button key={category.series_code} onClick={() => { setopen(!open) }} className={classes.nested_1}>
            <ListItemText primary={category.series_name} />
            {category.children && category.children.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : <></>}
          </ListItem>
          <Collapse in={open} unmountOnExit>
            <List>
              {category.children.map(item => {
                return (
                  <ListItem button key={item.series_code} onClick={()=>{moveToCategory(item.series_code)}} className={classes.nested_2}>
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