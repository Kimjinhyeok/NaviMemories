import TouchCarousel, { clamp } from 'react-touch-carousel'
import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC'
import React from 'react'
import CardComponent from '../card'
import CarouselContainer from './container'
import CardHtml from '../../card_html'

export default function CardSlideComponent(props) {

    const cardSize = 300
    const carouselWidth = clamp(window.innerWidth, 0, 960)
    const [cardList, setCardList] = React.useState(props.item)
    function renderContainer(props) {
        return (<CarouselContainer data={cardList} cardSize={cardSize} carouselWidth={carouselWidth} {...props}></CarouselContainer>)
    }
    function renderCard(index, modIndex, cursor) {
        var item = cardList[modIndex];
        return (
            // <CardComponent item={item}></CardComponent>
            <CardHtml item={item}/>
        )
    }
    return (
        <div id="react-root" className="container">
            <TouchCarousel
                component={touchWithMouseHOC(renderContainer)}
                cardCount={cardList.length}
                cardSize={cardSize}
                renderCard={renderCard}
                loop={false}
            ></TouchCarousel>
        </div>
    )
}