import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React from 'react'

export default function TopNaviDrawerComponent(props) {

  const {category, classes} = props;
  const [open, setopen] = React.useState(false)

  const topNaviComponent = function () {
    if (!category.children || category.children.length <= 0) {
      return (
        <ListItem button key={category.series_code} onClick={() => {}} className={classes.nested_1}>
          <ListItemText primary={category.category} />
        </ListItem>
      )
    } else {
      return (
        <>
          <ListItem button key={category.series_code} onClick={() => { setopen(!open) }} className={classes.nested_1}>
            <ListItemText primary={category.category} />
            {category.children && category.children.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : <></>}
          </ListItem>
          <Collapse in={open} unmountOnExit>
            <List>
              {category.children.map(item => {
                return (
                  <ListItem button key={item.series_code} onClick={()=>{}} className={classes.nested_2}>
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