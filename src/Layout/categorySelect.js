import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import Cookies from 'js-cookie';
import React from 'react'
import Categories from '../Data/categories'

export default function CategorySelect(props) {

  const {onChange} = props;
  const propsValue = props.value;

  const isLogin = Cookies.get('authtoken') ? true : false;
  const [arrayCategory, setArrayCategory] = React.useState([]);
  React.useEffect(() => {
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
    <div className={'w-full'}>
      <FormControl>
        <InputLabel >구절 분류 선택</InputLabel>
        <Select 
          value={value} 
          onChange={onHandleChange}
          label="구절 분류"
        >
          { arrayCategory.length > 0 ? printOptions() : <MenuItem value={null}></MenuItem>}
        </Select>
      </FormControl>
    </div>
  )
}