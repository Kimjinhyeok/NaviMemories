import { Button, Container, makeStyles, Paper } from '@mui/material';
import { AddSharp } from '@material-ui/icons';
import Http from '../../../Utils/Http';
import React, { useEffect, useRef, useState } from 'react'
import { useSnackbar } from 'notistack';
import OYOCardForView from './view';
import OYOCardForEdit from './edit';
import AlertDialog from '../../Dialog/alertDialog';

export default function OYOCardManage(props) {

  const classes = makeStyles(theme => ({
    cardManage_root : {
      height: `100%`,
      maxHeight: `100%`,
      overflowY: 'auto',
      padding: '0'
    },
    card_action: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    oyo_list : {
      padding: theme.spacing(1),
      '& > div': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      position: 'relative'
    },
    write: {
      width: '3.5em',
      minWidth: '3.5em',
      height: '3.5em',
      minHeight: '3.5em',
      borderRadius: '5em',
      opacity: 0.9,
      position: '-webkit-sticky',
      position: 'sticky',
      bottom: theme.spacing(1),
    },
    oyo_card_view: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      '& .theme': {
        lineHeight : '1.5em',
        fontSize: '1.2em'
      },
      '& .bcv': {
        '& > *:not(:first-child)' : {
          paddingLeft: theme.spacing(.8)
        }
      },
      '& .cn': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
      }
    },
    oyo_card_edit: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      '& > *': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      '& .cv': {
        marginTop: theme.spacing(2)
      },
      '& .cv > div:not(:first-child)': {
        paddingLeft: theme.spacing(1)
      },
      '& .cv, .actions': {
        display: 'flex',
        '& > *': {
          flex: 1
        }
      },
    }
  }))();

  const http = Http();
  const history = props.history;
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef(null)
  const [OYORow, setOYORow] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const delTarget = useRef({});

  useEffect( async () => {
    try {
      var {data} = await http.get({query : `RC/500`});
      data = data.map(item => {
        item.edit = false; 
        return item;
      });
      setOYORow(data);
    } catch(error) {
      const {message} = error.response.data;
      enqueueSnackbar(message || "OYO 카드를 불러오는 도중 오류가 발생했습니다.", {variant : 'error'})
    }
  }, [])
  const gotoWrite = function() {
    history.push('/oyo/template', {go: '/oyo/manage'});
  }
  const onClickEditCard = function(ev, index, value) {
    ref.current.scrollTo(ev.pageX, ev.clientY);
    setEdit(index, value);
  }
  const setEdit = function(index, value) {
    value.edit = true;
    setOYORow([
      ...OYORow.slice(0, index), 
      value,
      ...OYORow.slice(index+1)
    ])
  }
  const setDelete = function(index, value) {
    setDialogOpen(true);
    delTarget.current = {index, value};
  }
  const runDelete = async function() {
    var { index, value : target } = delTarget.current;

    try {
      var res = await http.delete({query: `RC/oyo/${target.card_num}`});
      if(res instanceof Error) {
        throw res;
      }
      setOYORow([...OYORow.slice(0, index), ...OYORow.slice(index+1)]);
      enqueueSnackbar("OYO 카드 삭제가 완료되었습니다.", { variant: 'success'});
    } catch (error) {
      var message = "OYO 카드 삭제 도중 장애가 발생했습니다.";
      if(error.response && error.response.data.message) {
        message = error.response.data.message;
      }
      enqueueSnackbar(message, {variant: 'error'});
    } finally {
      setDialogOpen(false);
    }
  }
  const cancelEdit = function(index, value) {
    value.edit = false;
    setOYORow([
      ...OYORow.slice(0, index), 
      value,
      ...OYORow.slice(index+1)
    ])
  }
  const runEdit = (index, origin) => async (state) => {
    try {
      
      var res = await http.put({
        query : `RC/oyo/${origin.card_num}`,
        data : {
          theme : state.theme,
          bible_code : state.bible_code,
          chapter : state.chapter,
          f_verse : state.f_verse,
          l_verse : state.l_verse,
          content : state.content
        }
      });
      if(res instanceof Error) {
        throw res;
      }
      var completeValue = {
        ...state,
        edit : false
      };
      setOYORow([...OYORow.slice(0, index), completeValue, ...OYORow.slice(index+1)]);
      enqueueSnackbar("OYO 카드 수정이 완료되었습니다.", {variant: 'success'});
    } catch (error) {
      var message = "OYO 카드 수정 도중 장애가 발생했습니다.";
      if(error.response && error.response.data.message) {
        message = error.response.data.message;
      }
      enqueueSnackbar(message, {variant : 'error'});
    }
  }
  const renderCard = function(idx, item) {
    return (
      <Paper elevation={2} key={item.id}>
        {
          item.edit ? 
            <></>
          :
            <div className={classes.card_action}>
              <Button variant="text" size="small" color="default" onClick={(ev) => onClickEditCard(ev, idx, item)}>편집</Button>
              <Button variant="text" size="small" color="default" onClick={() => setDelete(idx, item)}>삭제</Button>
            </div>
        }
        {
          item.edit ? 
            <OYOCardForEdit v={item} classes={classes} runEdit={runEdit(idx, item)} cancelEdit={() => cancelEdit(idx, item)}/>
          :
            <OYOCardForView v={item} classes={classes} /> 
        }

      </Paper>
    )
  }
  return (
    <Container className={classes.cardManage_root} maxWidth="sm" ref={ref}>
      <div className={classes.oyo_list}>
        {
          OYORow.map((item, idx) => {return renderCard(idx, item)})
        }
        <Button
          className={classes.write} 
          variant="contained" 
          color="primary"
          aria-label="create"
          onClick={() => gotoWrite()}><AddSharp /></Button>
      </div>
      {
        dialogOpen ? 
          <AlertDialog
            message="정말로 삭제하시겠습니까?"
            open={dialogOpen}
            agreeAction={runDelete}
            disagreeAction={() => setDialogOpen(false)}
            title="OYO 카드 제거"
          />
        :
        <></>
      }
    </Container>
  )
}