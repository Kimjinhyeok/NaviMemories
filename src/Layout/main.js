import React, { Fragment } from 'react'
import { Route } from 'react-router';
import ListComponent from './List/list';
import CardSlideComponent from './CardSlide/list';
import AppBarComponent from './appbar';
import { Categories } from '../Data/categories';

export default function MainComponent(props) {


    if (Categories.getCategories().length <= 0) {
        props.history.push("/prepare");
    }
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
            <AppBarComponent />
            {
                cardlist.length > 0 ?
                    <Fragment>
                        <Route path={`${props.match.path}/list`} render={props => <ListComponent item={cardlist} {...props} />} />
                        <Route path={`${props.match.path}/card`} render={props => <CardSlideComponent item={cardlist} {...props} />} />
                    </Fragment>
                    : <></>
            }
        </div>
    )
}