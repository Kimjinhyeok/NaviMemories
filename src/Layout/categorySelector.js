import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, makeStyles } from '@mui/material';
import { ExpandMore } from '@material-ui/icons'
import Categories from '../Data/categories';
import Cookies from 'js-cookie';

export default function CategorySelector(props) {

  const propsChangeHandle = props.onChange;
  const isLogin = Cookies.get('authtoken') ? true : false;
  const classes = makeStyles(theme => ({
    root: { 
      width: '100%',
      '& .MuiAccordionDetails-root': {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(3),
      }
    },
    accordion_label: {
      width : '100%',
    },
  }))();
  
  const [checkArray, setCheckArray] = React.useState([]);

  const [arrayCategory, setArrayCategory] = React.useState([]);
  React.useEffect(() => {
    let checkValueArray = [];
    Categories.forEach(item => {
      var checkItem = {master : false, series_code : item.series_code};
      checkItem.indeterminate = false;
      if(item.children.length > 0) {
        checkItem.children = [];
        item.children.forEach(child => {
          checkItem.children.push({
            check : false,
            series_code : child.series_code
          })
        });
      }
      checkValueArray.push(checkItem)
    })
    setArrayCategory(Categories);
    setCheckArray(checkValueArray);
  }, [])

  React.useEffect(() => {
    
    propsChangeHandle(extrackCheckedSeries(checkArray));
  }, [checkArray])
  const extrackCheckedSeries = function() {
    let seriesList = [];
    checkArray.forEach(item => {
      if(item.master && !item.indeterminate) {
        seriesList.push(item.series_code)
      } else if(item.children) {
        item.children.forEach(child => {
          if(child.check) {
            seriesList.push(child.series_code);
          }
        })
      }
    });
    return seriesList;
  }
  const handleOnCheckMaster = function(event, index) {

    var updateItem = checkArray[index];
    updateItem.master = !updateItem.master;
    if(updateItem.children) {
      updateItem.children.forEach(child => {
        child.check = updateItem.master;
      })
      updateItem.indeterminate = false;
    }
    setCheckArray([...checkArray.slice(0, index), updateItem, ...checkArray.slice(index+1)]);
  }

  const handleOnCheckChild = function (event, index, childIndex) {
    var updateItem = checkArray[index];
    
    updateItem.children[childIndex].check = !updateItem.children[childIndex].check;
    if(updateItem.indeterminate && (updateItem.children.every(item => item.check === true) || updateItem.children.every(item => item.check === false))) {
      updateItem.indeterminate = false;
    } else {
      updateItem.indeterminate = true;
    }

    setCheckArray([...checkArray.slice(0, index), updateItem, ...checkArray.slice(index+1)]);
  }

  return (
    arrayCategory.length > 0 ? 
    <div className={classes.root}>
      {
        arrayCategory.map((node, idx) => {
          if(node.series_code == 500) {
            if(!isLogin) return <></>
          }
          return (
          <Accordion
            key={idx}
            {...( node.children.length == 0 ? {expanded : false} : {})} 
          >
            <AccordionSummary
              expandIcon={node.children.length > 0 ? <ExpandMore /> : ""}
              aria-label="Expand"
              aria-controls={`additional-actions${idx}-content`}
              id={node.series_name}
            >
              <FormControlLabel
                aria-label={`${node.category}`}
                onClick={event => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox 
                  onChange={event => handleOnCheckMaster(event, idx)}
                  checked={checkArray[idx].master}
                  // defaultValue={checkArray[idx].series_code}
                  {...{indeterminate : checkArray[idx].indeterminate}}
                />}
                label={node.series_name}
                className={classes.accordion_label}
              />  
              
            </AccordionSummary>
              {
                node.children.length > 0 ? (
                  <AccordionDetails>
                  {
                    node.children.map((child, childIdx) => (
                      <FormControlLabel
                        aria-label={`additional-action${idx}-child${childIdx}-detail`}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                        control={<Checkbox 
                          onChange={(event) => handleOnCheckChild(event, idx, childIdx)}
                          checked={checkArray[idx].children[childIdx].check}
                          // defaultValue={checkArray[idx].children[childIdx].series_code}
                        />}
                        label={child.category}
                        key={`${idx}-${childIdx}`}
                      />
                    ))
                  }
                  </AccordionDetails>
                )
                : (<></>)
              }
          </Accordion>
        )})
      }
    </div>  
    : <></>
  )
}