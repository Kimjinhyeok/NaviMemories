import React from 'react'
import { Route, Switch } from 'react-router'
import RecitationLoading from './loading'
import PrepareForMember from './Prepare/forMember'
import RecitationExam from './Test'

export default function ExamMainPage(props) {

  const {location} = props;

  (() => {
    let paths = /\/(\w+)\/(\w+)/.exec(props.location.pathname);
    let state = location.state;
    if(paths[2] != "prepare" && !state) {
      location.pathname="/test/prepare";
    }
  })();
  return (
    <Switch>
      <Route path="/test/exam" render={(props) => <RecitationExam {...props} />}/>
      <Route path="/test/prepare" render={(props) => <PrepareForMember {...props} />}/>
      <Route path="/test/loading" render={(props) => <RecitationLoading {...props} />} />
    </Switch>
  )
} 