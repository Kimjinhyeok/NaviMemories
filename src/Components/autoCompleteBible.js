import React from 'react'
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
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
 
  const renderOption = props.renderOption || ((params) => (<><span className={'mr-2'}>{params.short_name}</span>{params.bible_name}</>))
  const autocompleteTextfieldRender = props.autocompleteTextfieldRender || 
    function autocompleteTextfieldRender(params) {
    return (
      <TextField 
        key={params.bible_code} 
        label="성경"
        fullWidth={fullWidth} 
        variant="outlined" 
        required
        error={validator}
        helperText={validator ? '성경을 선택해주세요' : ''}
        onFocus={ onFocus ? onFocus : ()=>{}}
        {...params} 
      />
    )
  }

  const [value, setValue] = React.useState(null);
  React.useEffect(() => {
    var bibleValue = defaultValue ? BibleData[defaultValue-1] : null;
    setValue(bibleValue);
  }, [defaultValue])

  const onHandleChange = function(event, newValue) {
    setValue(newValue);
    onChange(event, newValue);
  }
  const optionLabelFnc = (params) => {
    return params.bible_name
  };
  return (
    <Autocomplete
      id={id}
      options={BibleData}
      getOptionLabel={optionLabelFnc}
      onChange={onHandleChange}
      disabled={disabled}
      fullWidth={fullWidth}
      renderInput={autocompleteTextfieldRender}
      value={value}
    ></Autocomplete>
  )
}