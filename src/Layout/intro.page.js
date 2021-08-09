import { Container, makeStyles } from '@material-ui/core'
import React from 'react'

export default function IntroPageComponent(props) {

  const classes = makeStyles((theme) => ({
    intro_root : {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    intro_title : {
      marginTop: 'auto',
      marginBottom: 'auto',
      width: '100%',
      textAlign: 'center'
    },
    hyperlink: {
      color: theme.palette.text.primary
    }
  }))();
  return (
    <Container maxWidth="md" className={classes.intro_root}>
      <div className={classes.intro_title}>
        <h1>※ 주의 ※</h1>
        <p>본 사이트는 현재 개발중인 사이트이며, 업데이트에 따라서 제공되는 서비스 및 데이터에 변경이 있을 수 있습니다.</p>
        <p>현재 모바일 기기의 <span style={{color:'blue'}}>가로 모드</span>일 때에는 잘 보이지 않습니다. 꼭 <span style={{color:'red'}}>세로 모드</span>로 사용해주세요.</p>
        <p>건의 및 개선사항은 <a className={classes.hyperlink} href="mailto:eleazar6243@naver.com">eleazar6243@naver.com</a>으로 메일주시면 감사하겠습니다.</p>
      </div>
    </Container>
  )
}