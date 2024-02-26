import { Divider, FormControl, InputLabel, makeStyles, MenuItem, NativeSelect, Select } from '@mui/material'
import Cookies from 'js-cookie';
import React from 'react'
import Categories from '../Data/categories'

export default function CategorySelect(props) {

  const {onChange} = props;
  const propsValue = props.value;

  const classes = makeStyles(theme => ({
    selector_root: {
      width: '100%',
      '& .MuiFormControl-root': {
        width: '100%'
      }
    }
  }))()
  const isLogin = Cookies.get('authtoken') ? true : false;
  const [arrayCategory, setArrayCategory] = React.useState([]);
  React.useEffect(async () => {
    setArrayCategory(Categories);
  }, [])

  const [value, setValue] = React.useState(propsValue || null)
  const onHandleChange = function(event) {
    setValue(event.target.value);
    onChange(event);
  }
  const printOptions = function() {
    var optionList = []
    arrayCategory.map((item, parent_idx) => {
      if(item.series_code == 500) {
        if(!isLogin) return <></>
      }
      if(item.children.length > 0) {
        optionList.push(<MenuItem value={item.series_code} key={parent_idx}>{item.series_name}</MenuItem>)
        item.children.forEach((child, children_idx) => {
          optionList.push( <MenuItem value={child.series_code} key={parent_idx + '-' + children_idx}>{child.category}</MenuItem> )
        })
      } else {
        optionList.push(<MenuItem value={item.series_code} key={parent_idx}>{item.category}</MenuItem>)
      }
      optionList.push(<Divider/>)
    });
    return optionList;
  }
  return (
    <div className={classes.selector_root}>
      <FormControl>
        <InputLabel htmlFor="recitationCategorySelector">구절 분류 선택</InputLabel>
        <Select id="recitationCategorySelector" value={value} onChange={onHandleChange}>
          { arrayCategory.length > 0 ? printOptions() : <MenuItem value={null}></MenuItem>}
        </Select>
      </FormControl>
    </div>
  )
}