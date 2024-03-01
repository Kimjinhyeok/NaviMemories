import { AppBar, Tab, Tabs, Typography, withStyles  } from '@mui/material';
import React from 'react';
import CNQuestList from './cnQuestList';
import CVQuestList from './cvQuestList';

export default function TestQuestPanel(props) {

  const { Source, addResultQuestion, setDeduction, precedence } = props;

  const [TabIdx, setTabIdx] = React.useState(precedence == "cn" ? 0 : 1);

  function TabPanel(props) {
    const { value, index, className = '', ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-label={`full-width-tab-${index}`}
        className={className}
        {...other}>
      </div>
    )
  }
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Tabs
          value={TabIdx}
          onChange={(event, newVal) => { setTabIdx(newVal) }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs cardList">
          <Tab label="본문" {...a11yProps(0)}></Tab>
          <Tab label="장절" {...a11yProps(1)}></Tab>
        </Tabs>
      </AppBar>
      <div className={'h-full'}>
        <TabPanel value={TabIdx} index={0} className={'h-full'}>
          <CNQuestList origins={Source.cn} themeOf242={Source.themeOf242} precedence={precedence != "cv"} moveTab={() => {setTabIdx(1)}} setAddResultQuestion={addResultQuestion} setResultDeduction={setDeduction("cn")} />
        </TabPanel>
        <TabPanel value={TabIdx} index={1} className={'h-full'}>
          <CVQuestList origins={Source.cv} themeOf242={Source.themeOf242} precedence={precedence == "cv"} moveTab={() => {setTabIdx(0)}} setAddResultQuestion={addResultQuestion} setResultDeduction={setDeduction("cv")} />
        </TabPanel>
      </div>
    </>
  )
}