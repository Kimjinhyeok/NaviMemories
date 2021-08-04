import React from 'react'
import CardHtml from './card_html'
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@material-ui/core'
import 'swiper/swiper.min.css'
import "swiper/components/navigation/navigation.min.css"


// import Swiper core and required modules
import SwiperCore, {
    Navigation
  } from 'swiper/core';
  
  // install Swiper modules
  SwiperCore.use([Navigation]);
  
/**
 * @typedef CardSlideProps
 * @property {Array} item
 * @param {CardSlideProps} props 
 * @returns 
 */
export default function CardSlideComponent(props) {

    const [cardList] = React.useState(props.item)

    const useStyle = makeStyles((theme) => ({
        cardslideContainer: {
            height: '100%'
        },
        carouselContainer: {
            height: '100%',
            margin: 'auto 1vw',
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
            width: '400px',
            height: '400px',
            borderRadius: '5px',
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
            flexDirection: 'column',
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
            marginTop: theme.spacing(1),
            flex: 1,
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
    
    function renderCard(index, item) {
        return (
            <SwiperSlide><CardHtml item={item} key={index} classes={classes} /></SwiperSlide>
        )
    }
    return (
        <div className={classes.cardslideContainer}>
            <Swiper 
                className={classes.carouselContainer}
                spaceBetween={50}
                navigation={true} 
            >
                {
                    cardList.length > 0 ? cardList.map((item, idx) => renderCard(idx, item)) : <></>
                }
            </Swiper>
        </div>
    )
}