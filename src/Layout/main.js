import { Container, makeStyles } from '@material-ui/core';
import React from 'react'
import { Route, Switch } from 'react-router';
import AppBarComponent from './appbar';
import RecitationCardListComponent from './Cards';
import CardTemplateComponent from './cardTemplate';
import UnitPageComponent from './Check/Unit/unitPage';
import ExamMainPage from './Check/Exam';


export default function MainComponent(props) {

    const useStyle = makeStyles(theme => ({
        root_container : {
            height : '100%',
            maxHeight : '100%',
            display : 'flex',
            flexDirection : 'column',
            overflowY: 'auto'
        },
        main_content : {
            flex: 1,
            maxHeight: 'calc(100% - 64px)'
        }
    }))
    const classes = useStyle();
    return (
        <div className={classes.root_container}>
            <AppBarComponent {...props}     />
            <Container className={classes.main_content}>
                <Switch>
                    <Route path={`${props.params ? props.params.path: ''}/test/:path`} render={props => <ExamMainPage {...props} />} />
                    <Route path={`${props.params ? props.params.path: ''}/check`} render={props => <UnitPageComponent {...props}/>}/>
                    <Route path={`${props.params ? props.params.path : ''}/recitation/:code`} render={props => <RecitationCardListComponent {...props} />} />
                    <Route path={`${props.params ? props.params.path : ''}/template`} render={props => <CardTemplateComponent {...props}/>} />
                </Switch>
            </Container>
        </div>
    )
}