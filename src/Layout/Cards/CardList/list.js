import React from 'react'
import CardComponent from './card';
import { Container, makeStyles } from '@material-ui/core';

const UNIT_SIZE = 10;
export default function CardListComponent (props) {

    const originCardList = props.item;
    const [CardIndex, setCardIndex] = React.useState(originCardList.length > UNIT_SIZE ? UNIT_SIZE : originCardList.length)
    const [cardList, setCardList] = React.useState(originCardList.slice(0, CardIndex));
    const useStyle = makeStyles(theme => ({
        root_container: {
            paddingBottom: '10px'
        }
    }));
    const classes = useStyle();
    const containerRef = React.useRef(null);
    const target = React.useRef(null);

    function scrollToTop() {
        if(containerRef.current) {
            containerRef.current.scrollIntoView();
        }
    }
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        const lastCard = entries[0];
    
        if (lastCard.intersectionRatio > 0) {
          observer.unobserve(lastCard.target);
          target.current = null;

          loadData();
        }
    });    
    function loadData() {
        if(cardList.length == CardIndex) {
            let pinIndex = CardIndex + UNIT_SIZE > originCardList.length ? originCardList.length : CardIndex + UNIT_SIZE 
            let dumyCardList = originCardList.slice(CardIndex, pinIndex);
            setCardIndex(pinIndex)
            setCardList((preState) => {
                return [...preState, ...dumyCardList]
            });
        }
    }

    React.useEffect(() => {
        if (target.current) {
            intersectionObserver.observe(target.current);
        }        
    })
    React.useEffect(() => {
        scrollToTop();
    }, [])

    return (
        <Container maxWidth="sm" className={classes.root_container} ref={containerRef}>
            {
                cardList.map((item, idx) => {
                    const lastEl = idx === CardIndex - 1;
                    return <CardComponent item={item} key={idx} ref={lastEl ? target : null}></CardComponent>
                })
            }
        </Container>
    )
}