import { Button, Container, Grid, Typography } from '@mui/material'

import React from 'react'
import { useNavigate } from 'react-router'
import cookies from '../Data/cookies'

export default function IntroPageComponent(props) {

  const isLogin = cookies.isLogin();
  
  return (
    <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className='py-4 animate-fadeIn'>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ width: '100%', flex: 1 }}>
        <GridMenuButton path='recitation/00'>암송 읽기</GridMenuButton>
        {
          isLogin && <GridMenuButton path='recitation/500'>OYO 카드 읽기</GridMenuButton>
        }
        <GridMenuButton path='check/cn'>암송 본문 체크</GridMenuButton>
        <GridMenuButton path='check/cv'>암송 장절 체크</GridMenuButton>
        <GridMenuButton path='test/v_prepare'>암송 모의 테스트</GridMenuButton>

      </Grid>
      <div className={'py-5 w-full text-center'}>
        <h1>※ 주의 ※</h1>
        <p>본 사이트는 현재 개발중인 사이트이며, 업데이트에 따라서 제공되는 서비스 및 데이터에 변경이 있을 수 있습니다.</p>
        <p>현재 모바일 기기의 <span style={{color:'blue'}}>가로 모드</span>일 때에는 잘 보이지 않습니다. 꼭 <span style={{color:'red'}}>세로 모드</span>로 사용해주세요.</p>
        <p>건의 및 개선사항은 <a className={'bg-blue-500'} href="mailto:eleazar6243@naver.com">eleazar6243@naver.com</a>으로 메일주시면 감사하겠습니다.</p>
      </div>
    </Container>
  )
}

const GridMenuButton = ({ path="", children="" }) => {
  
  const navigator = useNavigate();

  const handleClickMenu = (path) => () => {
    navigator(path);
  }
  return (
    <Grid item xs={6} md={3} className='flex justify-center items-center'>
      <Button onClick={handleClickMenu(path)} fullWidth variant='contained' className='h-48'>
        <Typography component='div' variant='h6'>
          {children}
        </Typography>
      </Button>
    </Grid>
  )
}