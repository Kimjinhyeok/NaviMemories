import { CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import React, { useEffect, useRef, useState } from 'react'
import Http from '../../../Utils/Http';
import { useLocation, useNavigate } from 'react-router';

export default function RecitationLoading(props) {

  const { state } = useLocation();
  const navigator = useNavigate();
  
  const rootRef = useRef(null)
  const [Size, setSize] = useState(0);
  useEffect(async () => {
    const { clientHeight, clientWidth } = rootRef.current;
    setSize(Math.min(clientHeight, clientWidth) * 0.5);

    var cardList = await loadingVerses();

    var { path, themeOf242, precedence } = state;
    navigator(path, {
      state: { themeOf242, precedence, cardList}
    });
  }, [])

  async function loadingVerses() {
    let {mode, version, include242 } = state;

    let data = {
      version: version,
      include242: include242
    }
    if(mode == "v") {
      data.series = state.series.toString(",");
    } else {
      data.participation = state.participation;
    }
    var http = Http();
    var res = await http.get({
      query : `exam/${mode === "v" ? "guest": "mem"}`,
      data: data
    });

    var cardList = devideCardList(res.data);

    return cardList;
  }
  function devideCardList(cardlist) { 
    return {
      cn : cardlist.filter((v, i) => (((i+1)%2) == 0)),
      cv : cardlist.filter((v, i) => (((i+1)%2) != 0))
    }
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