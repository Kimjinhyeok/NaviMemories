import { useState } from "react";
import { FormGroup, InputLabel, Select, FormControl, MenuItem, IconButton } from "@mui/material";
import cookies from "../../../Data/cookies";
import { Container } from "@mui/system";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const SortOption = {
  createAt : 'createAt',
  category : 'category',
  bible_code : 'bible_code'
};

const SortProperty = {
  createAt : 'create_at',
  category : 'series_code',
  bible_code : 'bible_code'
}

export default function CardArrangeMenu({ category=0, updateSort=()=>{}, updateFilter=()=>{} }) {

  const [Options, setOptions] = useState({
    expand : false,
    sort : category >= 500 ? SortOption.createAt : SortOption.category,
    filter : 'all',
  });
  
  const getFilterType = (newType) => {
    switch(newType) {
      case 'all' :
        return () => true;
      case 'memorized':
        return (item) => item.passed;
      case 'non_memorized':
        return (item) => !item.passed;
    }
  }
  const getSortType = (newType) => {
    switch(newType) {
      case SortOption.createAt :
        return SortProperty.createAt;
      case SortOption.category :
        return SortProperty.category;
      case SortOption.bible_code :
        return SortProperty.bible_code;
    }
  }
  const handleUpdateSort = (event) => {
    const newOptions = {...Options, sort : event.target.value};
    setOptions(newOptions);
    const sortType = getSortType(newOptions.sort);
    
    const sortFnc = (a,b) => {
      return a[sortType] > b[sortType] ? 1 : (a[sortType] == b[sortType] ? 0 : -1)
    }
    updateSort(sortFnc);
  }
  const handleUpdateFilter = (event) => {
    const newOptions = {...Options, filter : event.target.value};
    setOptions(newOptions);
    
    const filterFnc = getFilterType(newOptions.filter);
    updateFilter(filterFnc);
  }
  const handleExpand = (event) => {
    setOptions({
      ...Options,
      expand : !Options.expand
    })
  }
  return (
    <div className="relative flex items-center justify-center">
      <div className={`md:px-6 height: ${Options.expand ? '100%' : '0%'}, overflow : ${Options.expand ? 'auto' : 'hidden'} pb-3`}>
        <FormGroup
          sx={{ display: "flex", flexDirection: "row", marginTop: "4px" }}
          className="space-x-10 justify-center md:justify-start"
        >
          <FormControl variant="standard">
            <InputLabel>정렬</InputLabel>
            <Select
              value={Options.sort}
              onChange={handleUpdateSort}
              className="w-32"
            >
              {
                category >= 500
                ? <MenuItem value={SortOption.createAt}>
                    등록순
                  </MenuItem>
                : <MenuItem value={SortOption.category}>
                    시리즈순
                  </MenuItem>
              }
              <MenuItem value={SortOption.bible_code}>성경순</MenuItem>
            </Select>
          </FormControl>
          {cookies.isLogin() ? (
            <FormControl variant="standard">
              <InputLabel>필터</InputLabel>
              <Select
                value={Options.filter}
                onChange={handleUpdateFilter}
                className="w-32"
              >
                <MenuItem value="all">전체</MenuItem>
                <MenuItem value="memorized">암송</MenuItem>
                <MenuItem value="non_memorized">미암송</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <></>
          )}
        </FormGroup>
      </div>
      <ExpandButton expand={Options.expand} handleExpand={handleExpand} />
    </div>
  );
}

const ExpandButton = ({ handleExpand = ()=>{}, expand = false }) => (
  <div className="absolute top-[100%] left-[50%] transform translate-x-[-50%] translate-y-[-30%] z-10">
    <IconButton 
      title={expand ? "옵션 닫기" : "옵션 열기"}
      onClick={handleExpand}
      sx={{ 
        backgroundColor :  "#1976d2" , 
        "&:hover" : {
          backgroundColor : "#2563eb"
        },
        color: 'white'}}
    >
        {
          expand
          ? <ExpandLess />
          : <ExpandMore />
        }
    </IconButton> 
  </div>
)