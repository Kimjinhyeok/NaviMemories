import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons'
import { arrayCategories, Categories } from '../Data/categories';

export default function CategorySelctor(props) {

  
  const classes = makeStyles(theme => ({
    root: { 
      width: '100%',
      '& .MuiAccordionDetails-root': {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(3),
        border: `1px solid ${theme.palette.action.active}`
      }
    },
    accordion_label: {
      width : '100%',
    },
  }))();

  const [arrayCategory, setArrayCategory] = React.useState([]);

  React.useEffect(async () => {
    var categories = await Categories.getCategories();
    var categoryArr = arrayCategories(categories);
    setArrayCategory(categoryArr);
  }, [])

  const printAccodion = function () {
    
    return (
      <div className={classes.root}>
        {
          arrayCategory.map((node, idx) => (
            <Accordion
              {...( node.children.length == 0 ? {expanded : false} : {})} 
            >
              <AccordionSummary
                expandIcon={node.children.length > 0 ? <ExpandMore /> : ""}
                aria-label="Expand"
                aria-controls={`additional-actions${idx}-content`}
                id={node.category}
              >
                <FormControlLabel
                  aria-label={`${node.category}`}
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  control={<Checkbox />}
                  label={node.category}
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
                          onClick={(event) => event.stopPropagation()}
                          onFocus={event => event.stopPropagation()}
                          control={<Checkbox/>}
                          label={child.category}
                        />
                      ))
                    }
                    </AccordionDetails>
                  )
                  : (<></>)
                }
            </Accordion>
          ))
        }
      </div>
    )
  }
  return (arrayCategory.length > 0 ? printAccodion() : <></>)
}