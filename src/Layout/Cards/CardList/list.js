import React, { useLayoutEffect, useMemo } from 'react'
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
        },
        root : {
            margin : theme.spacing(2),
            position: 'relative'
        },
        title : {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            fontSize: '1.2rem !important'
        },
        c_content : {
            display : 'flex',
            flexDirection : 'column',
            textAlign : 'left',
            marginTop : theme.spacing(1),
            marginBottom : theme.spacing(1)
        },
        bible_code : {
            marginRight : theme.spacing(1)
        },
        chapter : {
            display : 'flex',
            flexDirection : 'row',
        },
        verse_text : {
            marginTop : theme.spacing(1),
            marginBottom : theme.spacing(1)
        },
        category : {
            textAlign : 'end',
            color : theme.palette.secondary.light
        },
        options : {
            position: 'absolute',
            right: theme.spacing(1),
            top: 0
        }
    }));
    const classes = useStyle();
    const containerRef = React.useRef(null);
    const target = React.useRef(null);

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
        <Container maxWidth="sm" className={classes.root_container} ref={containerRef}>
            {
                cardList.map((item, idx) => {
                    const lastEl = idx === CardIndex - 1;
                    return <CardComponent item={item} key={idx} ref={lastEl ? target : null} classes={classes} updatePassed={props.updatePassed}></CardComponent>
                })
            }
        </Container>
    )
}