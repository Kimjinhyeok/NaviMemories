import { Button, Paper } from '@mui/material';
import { AddSharp } from '@mui/icons-material';
import Http from '../../../Utils/Http';
import React, { useRef, useState } from 'react'
import { useSnackbar } from 'notistack';
import OYOCardForView from './view';
import OYOCardForEdit from './edit';
import AlertDialog from '../../Dialog/alertDialog';
import { useNavigate } from 'react-router';
import OyoEmptyCard from './empty.card';
import OyoUsecase from '../../../Usecase/oyo/oyo';

export default function OYOCardManage({OYORow, setOYORow}) {

  const http = Http();
  const navigator = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef(null)
  const [dialogOpen, setDialogOpen] = useState(false);
  const delTarget = useRef({});

  const gotoWrite = function() {
    navigator('/oyo/template', {go: '/oyo/manage'});
  }
  const onClickEditCard = function(ev, index, value) {
    // ref.current.scrollTo(ev.pageX, ev.clientY);
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
      const {card_num} = target;
      const res = await OyoUsecase.removeOyo({card_num});
      if(res instanceof Error) {
        enqueueSnackbar(res.message, { variant: 'warning' });
      } else {
        setOYORow([...OYORow.slice(0, index), ...OYORow.slice(index+1)]);
        enqueueSnackbar("OYO 카드 삭제가 완료되었습니다.", { variant: 'success'});
      }
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
      const data = {
        theme : state.theme,
        bible_code : state.bible_code,
        chapter : state.chapter,
        f_verse : state.f_verse,
        l_verse : state.l_verse,
        content : state.content
      };

      const res = OyoUsecase.updateOyo(data);
      
      if(res instanceof Error) {
        enqueueSnackbar(res.message, { variant: 'warning' });
      } else {
        const completeValue = {
          ...state,
          edit : false
        };
        setOYORow([...OYORow.slice(0, index), completeValue, ...OYORow.slice(index+1)]);
        enqueueSnackbar("OYO 카드 수정이 완료되었습니다.", {variant: 'success'});
      }
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
            <div className={'flex justify-end'}>
              <Button variant="text" size="small" onClick={(ev) => onClickEditCard(ev, idx, item)}>편집</Button>
              <Button variant="text" size="small" onClick={() => setDelete(idx, item)}>삭제</Button>
            </div>
        }
        {
          item.edit ? 
            <OYOCardForEdit v={item} runEdit={runEdit(idx, item)} cancelEdit={() => cancelEdit(idx, item)}/>
          :
            <OYOCardForView v={item} /> 
        }

      </Paper>
    )
  }
  return (
    <>
      <div className={'w-full space-y-2 pb-4'}>
        {
          OYORow.length > 0 
          ? OYORow.map((item, idx) => {return renderCard(idx, item)})
          : <OyoEmptyCard />
        }
      </div>
      <div className='fixed right-2 md:right-4 bottom-4'>
        <Button
          sx={{
            width: '3.5em', minWidth: '3.5em', height: '3.5em', minHeight: '3.5em', borderRadius: '5em', opacity: 0.9,
          }}
          variant="contained" 
          color="primary"
          aria-label="create"
          onClick={gotoWrite}><AddSharp /></Button>
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
    </>
  )
}