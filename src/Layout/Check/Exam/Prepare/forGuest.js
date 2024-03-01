import { Button, Card, CardActions, CardContent, CardHeader, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { styled } from '@mui/system';
import React, { useContext } from 'react'
import AlertDialog from '../../../Dialog/alertDialog';
import CategorySelector from '../../../categorySelector';
import cookies from '../../../../Data/cookies';
import { Context } from '../../../../Utils/Context';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

export default function PrepareForGuest(props) {

  const navigator = useNavigate();
  const initialOption = {
    alert: true,
    series: [],
    include242: false,
    themeOf242: "true",
    precedence: "cn",
    version: "gae"
  }
  
  const {state : {version}} = useContext(Context);
  const [options, setOptions] = React.useState({...initialOption, version: version ? 'gae' : 'kor'});
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeOptions = (property="") => (event) => {
    const value = event.target.value;
    setOptions({
      ...options,
      [property] : value
    })
  }
  const handleChangeSeries = function (seriesList) {
    setOptions({
      ...options,
      series: seriesList
    })
  }
  const moveBack = () => {
    navigator(-1);
  }
  React.useEffect(() => {
    let isInclude242 = options.series.findIndex(series => (series % 300) <= 99) > -1;
    setOptions({
      ...options,
      include242: isInclude242
    });
  }, [options.series])

  const loadingCardList = async function() {

    if(options.series.length <= 0) {
      enqueueSnackbar("테스트 구절을 하나 이상 선택해주세요.", { variant : 'error'});
      return;
    }
    navigator('/test/loading', {
      state : { 
        mode : "v",
        path: '/test/exam',
        version : options.version,
        include242 : options.include242,
        themeOf242 : options.themeOf242,
        series : options.series,
        precedence : options.precedence
      }
    });
  }
  return (
    <Container maxWidth="sm">
      <Card>
        {options.alert ?
          <AlertDialog
            agreeAction={() => { setOptions({ ...options, alert: false }) }}
            disagreeAction={moveBack}
            title="암송 모의 테스트 안내"
            message="암송 모의 테스트는 OYO 카드가 적용되지 않으며 실제 암송 테스트와 다른 결과가 나올 수 있습니다. 진행 하시겠습니까?"
            open={options.alert}
          /> : <></>}
        <CardHeader title="암송 모의 테스트" />
        <CardContent className={'mt-3 w-full max-h-full space-y-2'}>
          <div>
            <CategorySelector onChange={handleChangeSeries} />
          </div>
          {
            options.include242 ?
              (
                <div className={'flex flex-col'}>
                  <FormControl>
                    <FormLabel component="legend">242 주제 포함</FormLabel>
                    <RadioGroup value={options.themeOf242} onChange={handleChangeOptions('themeOf242')}>
                      <FormControlLabel value="true" control={<Radio />} label="네" />
                      <FormControlLabel value="false" control={<Radio />} label="아니요" />
                    </RadioGroup>
                  </FormControl>
                </div>
              )
              : <></>
          }
          <div className={'flex flex-col'}>
            <FormControl>
              <FormLabel component="legend">선행 문제 선택</FormLabel>
              <RadioGroup
                value={options.precedence}
                row
                onChange={handleChangeOptions('precedence')}>
                <FormControlLabel
                  label="내용"
                  value="cn"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="장절"
                  value="cv"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel component="legend">역본 선택</FormLabel>
              <RadioGroup
                value={options.version}
                row
                onChange={handleChangeOptions('version')}>
                <FormControlLabel
                  label="개역한글"
                  value="kor"
                  control={<Radio />}
                />
                <FormControlLabel
                  label="개역개정"
                  value="gae"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
        <CardActions className={'flex flex-row'}>
          <Button variant="contained" color="primary" onClick={loadingCardList}>다음</Button>
        </CardActions>
      </Card>
    </Container>
  )
}