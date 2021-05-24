import TouchCarousel, { clamp } from 'react-touch-carousel'
import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC'
import React from 'react'
import CarouselContainer from './container'
import CardHtml from '../../card_html'
import { makeStyles } from '@material-ui/core'

export default function CardSlideComponent(props) {

    const cardSize = 300
    const carouselWidth = clamp(window.innerWidth, 0, 960)
    const [cardList, setCardList] = React.useState(props.item)

    const useStyle = makeStyles((theme) => ({
        carouselContainer: {
            position: 'relative',
            height: '300px',
            maxWidth: '960px',
            margin: '0 auto',
            overflow: 'hidden',
            touchAction: 'pan-y',
        },

        carouselTrack: {
            display: 'flex',
            height: '100%',
        },

        carouselCard: {
            flex: '0 0 300px',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '5px',
            '-webkit-tap-highlight-color': 'transparent',
        },

        carouselCardInner: {
            display: 'flex',
            flexDirection: 'column',
            width: '290px',
            height: '290px',
            borderRadius: '5px',
            // background: '#095080',
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
            borderStyle: 'solid'
        },

        carouselTitle: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: '1.5em',
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        },
        carouselText: {
            display: 'flex',
            flex: 1,
            flexDirection : 'column',
            padding: '1em', 
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            color: theme.palette.text.primary,
        },
        chapterLayer: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '5px',
        },
        bibleName: {
            marginRight: '5px'
        },
        verses: {
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
        },
        verseText: {
            marginTop : theme.spacing(1),   
            flex : 1,
        },
        category: {
            color: theme.palette.secondary.main,
            textAlign: 'right'
        },
        carouselPaginationWrapper: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
        },

        carouselPagination: {
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-around',
            width: '180px',
            padding: 0,
            li: {
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(50, 50, 50, 0.5)',
            },
            current: {
                borderRadius: 0,
                background: 'white',
            }
        },

    }))
    const classes = useStyle();
    function renderContainer(props) {
        return (<CarouselContainer data={cardList} cardSize={cardSize} carouselWidth={carouselWidth} classes={classes} {...props}></CarouselContainer>)
    }
    function renderCard(index, modIndex, cursor) {
        var item = cardList[modIndex];
        return (
            <CardHtml item={item} key={index} classes={classes} />
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