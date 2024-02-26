import React from 'react'
import { makeStyles, TextField } from '@mui/material';
import {Autocomplete} from '@mui/material'; 
import BibleData from '../Data/bible';

/**
 * @typedef AutoCompleteBIbleClasses
 * @property {Object} 
 */
/**
 * @typedef AutoCompleteProperties
 * @property {Function} onChange
 * @property {ClassNameMap} classes
 * @property {boolean} fullWidth
 * @property {String} id
 * @property {boolean} validator
 * @property {Function} renderOption
 * @property {Function} autocompleteTextfieldRender
 */
/**
 * @param {AutoCompleteProperties} props 
 * @returns 
 */
export default function AutoCompleteBible(props) {

  const { onChange, onFocus, classes, fullWidth, validator, defaultValue, className, disabled } = props;
  
  const id = props.id || "bible_auto_complete";
  const useStyle = makeStyles(theme => ({
    bibleAutoComplete: {
      backgroundColor: theme.palette.action.hover,
      '& .MuiFormLabel-root.Mui-disabled': {
        color: theme.palette.text.hint
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.palette.text.primary
      }
    }
  }));
  const styles = useStyle();

  const renderOption = props.renderOption || ((params) => (<><span className={classes.shortName}>{params.short_name}</span>{params.bible_name}</>))
  const autocompleteTextfieldRender = props.autocompleteTextfieldRender || 
    function autocompleteTextfieldRender(params) {
    return (
      <TextField 
        key={params.bible_code} 
        label="성경"
        fullWidth={fullWidth} 
        // className={classes.autocomplete_textfield} 
        variant="outlined" 
        required
        error={validator}
        helperText={validator ? '성경을 선택해주세요' : ''}
        onFocus={ onFocus ? onFocus : ()=>{}}
        {...params} 
      />
    )
  }

  // const [bibleCodes, setBibleCodes] = React.useState([]);
  

  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    var bibleValue = defaultValue ? BibleData[defaultValue-1] : null;
    setValue(bibleValue);
  }, [defaultValue])

  const onHandleChange = function(event, newValue) {
    setValue(newValue);
    onChange(event, newValue);
  }
  return (
    <Autocomplete
      id={id}
      options={BibleData}
      getOptionLabel={(props) => props.bible_name}
      onChange={onHandleChange}
      disabled={disabled}
      fullWidth={fullWidth}
      className={`${disabled ? styles.bibleAutoComplete : ''} ${className}`}
      renderOption={renderOption}
      renderInput={autocompleteTextfieldRender}
      value={value}
    ></Autocomplete>
  )
}