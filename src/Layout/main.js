import { Container, makeStyles } from '@material-ui/core';
import React from 'react'
import { Route } from 'react-router';
import AppBarComponent from './appbar';
import RecitationCardListComponent from './Cards';
import CardTemplateComponent from './cardTemplate';
import UnitPageComponent from './Check/Unit/unitPage';
import RecitationExam from './Check/Exam';


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
                <Route path={`${props.params ? props.params.path: ''}/exam`} render={props => <RecitationExam {...props} />} />
                <Route path={`${props.params ? props.params.path: ''}/check`} render={props => <UnitPageComponent {...props}/>}/>
                <Route path={`${props.params ? props.params.path : ''}/recitation/:code`} render={props => <RecitationCardListComponent {...props} />} />
                <Route path={`${props.params ? props.params.path : ''}/template`} render={props => <CardTemplateComponent {...props}/>} />
            </Container>
        </div>
    )
}