import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import React, { useEffect, useRef, useState } from 'react'
import Http from '../../../Utils/Http';

export default function RecitationLoading(props) {

  const state = props.location.state;
  const history = props.history;
  const classes = makeStyles(theme => ({
    loading_root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      '& > div': {
        textAlign: 'center'
      },
      '& .MuiCircularProgress-root' : {
        margin: 'auto'
      },
      '& .MuiCircularProgress-colorPrimary' : {
        color: lightBlue[500]
      }
    }
  }))();

  const rootRef = useRef(null)
  const [Size, setSize] = useState(0);
  useEffect(async () => {
    const { clientHeight, clientWidth } = rootRef.current;
    setSize(Math.min(clientHeight, clientWidth) * 0.5);

    var cardList = await loadingVerses();

    var { path, themeOf242, precedence } = state;
    history.push({
      pathname: path,
      state: { themeOf242, precedence, cardList}
    });
  }, [])

  async function loadingVerses() {
    let {version, include242, participation} = state;

    var http = Http();
    var res = await http.get({
      query : "/exam/mem",
      data: {
        participation: participation,
        version: version,
        include242: include242
      }
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
    <Container maxWidth="sm" ref={rootRef} className={classes.loading_root}>
      <div>
        <CircularProgress size={Size} />
        <h3>암송 카드를 준비 중입니다.</h3>
      </div>
    </Container>
  )
}