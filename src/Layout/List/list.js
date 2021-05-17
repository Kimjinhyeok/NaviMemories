import React from 'react'
import CardComponent from '../card';
import { Container } from '@material-ui/core';

export default function ListComponent (props) {

    const [cardList] = React.useState(props.item);

    return (
        <Container maxWidth="sm">
            {
                cardList.map(item => <CardComponent item={item}></CardComponent>)
            }
        </Container>
    )
}