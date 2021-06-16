import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'
import Http from '../Utils/Http';

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

  const http = Http();
  const { onChange, classes, fullWidth, validator, defaultValue, className, disabled } = props;
  
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
        label="성경" {...params} 
        fullWidth={fullWidth} 
        // className={classes.autocomplete_textfield} 
        variant="outlined" 
        required
        error={validator}
        helperText={validator ? '성경을 선택해주세요' : ''}
      />
    )
  }

  const [bibleCodes, setBibleCodes] = React.useState([]);
  React.useEffect(async () => {
    var response = await http.get({query : "/resource/bible"});
    var recvBibleCodes = response.data;
    setBibleCodes(recvBibleCodes);
  }, [])
  
  return (
    bibleCodes.length > 0 ? 
    (<Autocomplete
      id={id}
      options={bibleCodes}
      getOptionLabel={(props) => props.bible_name}
      onChange={onChange}
      disabled={disabled}
      defaultValue={bibleCodes[defaultValue - 1]}
      fullWidth={fullWidth}
      className={`${disabled ? styles.bibleAutoComplete : ''} ${className}`}
      renderOption={renderOption}
      renderInput={autocompleteTextfieldRender}
    ></Autocomplete>)
    : <></>
  )
}