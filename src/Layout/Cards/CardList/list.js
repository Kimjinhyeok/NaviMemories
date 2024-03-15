import React, { useContext, useLayoutEffect, useMemo } from 'react'

import CardComponent from './card';
import { Container } from '@mui/material';
import { Context } from '../../../Utils/Context';

const UNIT_SIZE = 10;
export default function CardListComponent (props) {

    const originCardList = props.item;
    const [CardIndex, setCardIndex] = React.useState(originCardList.length > UNIT_SIZE ? UNIT_SIZE : originCardList.length)
    const [cardList, setCardList] = React.useState(originCardList.slice(0, CardIndex));
   
    const containerRef = React.useRef(null);
    const target = React.useRef(null);

    const {state : {version}} = useContext(Context);
    const findFirstElementInViewPort = elements =>
        Array.prototype.find.call(
        elements,
        element => element.getBoundingClientRect().y >= 85 // nav height offset
        );    

    const scrollTo = useMemo(() => {
        // Find all elements in container which will be checked if are in view or not
        const nodeElements = containerRef.current?.querySelectorAll("[data-item]");
        if (nodeElements) {
          return findFirstElementInViewPort(nodeElements);
        }
    
        return undefined;
      }, [containerRef]);

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
    // React.useEffect(() => {
    //     scrollToTop();
    // }, [])

    useLayoutEffect(() => {
      if (scrollTo) {
        // Scroll to element with should be in view after rendering
        scrollTo.scrollIntoView();
        // Scroll by height of nav
        window.scrollBy(0, -85);
      }
    }, [scrollTo, containerRef]);


    return (
        <Container maxWidth="sm"  ref={containerRef}>
            <div className='space-y-2'>
                {
                    cardList.map((item, idx) => {
                        const lastEl = idx === CardIndex - 1;
                        return <CardComponent item={item} key={idx} ref={lastEl ? target : null}  version={version} updatePassed={props.updatePassed}></CardComponent>
                    })
                }
            </div>
        </Container>
    )
}