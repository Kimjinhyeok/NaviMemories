import React from 'react'
import CardComponent from './card';
import { Container, makeStyles } from '@material-ui/core';

export default function CardListComponent (props) {

    const [cardList] = React.useState(props.item);
    const useStyle = makeStyles(theme => ({
        root_container: {
            paddingBottom: '10px'
        }
    }));
    const classes = useStyle();
    var containerRef = React.useRef(null);

    function scrollToTop() {
        if(containerRef.current) {
            containerRef.current.scrollIntoView();
        }
    }
    
    React.useEffect(() => {
        scrollToTop();
    }, [containerRef])

    return (
        <Container maxWidth="sm" className={classes.root_container} ref={containerRef}>
            {
                cardList.map((item, idx) => <CardComponent item={item} key={idx}></CardComponent>)
            }
        </Container>
    )
}