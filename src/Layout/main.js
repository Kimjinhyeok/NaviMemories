import React, { Fragment } from 'react'
import {CssBaseline} from '@material-ui/core'
import { Route, Switch } from 'react-router';
import ListComponent from './List/list';
import CardSlideComponent from './CardSlide/list';

export default function MainComponent (props) {

    const [cardlist, setCardList] = React.useState([])
    
    React.useEffect(async () => {
        var location = props.location.pathname;
        var response = await fetch(`/mock_memories.json`);
        var recvCardList = await response.json();
        setCardList(recvCardList)

        props.history.push(location);
    }, [])

    return (
        <div>
            <h3>Main.js</h3>
            {
                cardlist.length > 0 ? 
                    <Fragment>
                        <Route path={`${props.match.path}/list`} render={props => <ListComponent item={cardlist} {...props}/>}/>
                        <Route path={`${props.match.path}/card`} render={props => <CardSlideComponent item={cardlist} {...props}/>}/>
                    </Fragment>
                : <></>
            }
        </div>
    )
}