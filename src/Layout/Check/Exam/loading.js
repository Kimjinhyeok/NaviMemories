import { CircularProgress, Container } from '@mui/material';

import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import ExamUsecase from '../../../Usecase/exam/exam';

export default function RecitationLoading(props) {

  const { state } = useLocation();
  const navigator = useNavigate();
  
  const rootRef = useRef(null)
  const [Size, setSize] = useState(0);
  useEffect(() => {
    const { clientHeight, clientWidth } = rootRef.current;
    setSize(Math.min(clientHeight, clientWidth) * 0.5);

    (async () => {
      const cardList = await loadingVerses();
  
      const { path, themeOf242, precedence } = state;
      navigator(path, {
        state: { themeOf242, precedence, cardList}
      });

    })();
  }, [])

  async function loadingVerses() {
    const {mode, version, include242 } = state;

    const data = {
      version,
      include242,
      mode, 
      version, 
      include242
    }
    if(mode == "v") {
      data.series = state.series.toString(",");
    } else {
      data.participation = state.participation;
    }
    const res = await ExamUsecase.getCardList(data);
    
    return res;
  }
  return (
    <Container maxWidth="sm" ref={rootRef} 
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center !important', alignContent: 'center !important' }}>
      <div className='flex flex-col items-center space-y-4'>
        <CircularProgress size={Size} />
        <h3>암송 카드를 준비 중입니다.</h3>
      </div>
    </Container>
  )
}