import React, { useContext } from 'react'
import CardHtml from './card_html'
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@material-ui/core'
import 'swiper/swiper.min.css'
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/scrollbar/scrollbar.min.css"


// import Swiper core and required modules
import SwiperCore, {
    Mousewheel,
    Navigation,
    Scrollbar,
    Virtual,
  } from 'swiper/core';
import { Context } from '../../../Utils/Context';

  // install Swiper modules
  SwiperCore.use([Navigation, Virtual, Scrollbar, Mousewheel]);
  
const UNIT_SIZE = 30;
/**
 * @typedef CardSlideProps
 * @property {Array} item
 * @param {CardSlideProps} props 
 * @returns 
 */
export default function CardSlideComponent(props) {

    const originCardList = props.item;
    const initSlide = props.initSlide;
    const setInitSlide = props.setInitSlide;
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
            // textAlign: 'center',
            borderRadius: '5px',
            '-webkit-tap-highlight-color': 'transparent',
        },

        carouselCardInner: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '400px',
            height: '400px',
            borderRadius: '5px',
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
            borderStyle: 'solid'
        },

        carouselTitle: {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
            fontSize: '1.5em',
            // backgroundColor: theme.palette.primary.main,
            // color: 'white'
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
            alignContent: 'center',
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
        option : {
            position: 'absolute',
            right : theme.spacing(2),
            // top : theme.spacing(2)
        }
    }));
    const [CardIndex, setCardIndex] = React.useState(originCardList.length > UNIT_SIZE ? UNIT_SIZE : originCardList.length );
    const [cardList, setCardList] = React.useState(originCardList.slice(0, CardIndex));
    const classes = useStyle();

    const {state : {version}} = useContext(Context);

    function renderCard(index, item) {
        return (
            <SwiperSlide virtualIndex={'v'+index} key={index}>
                <CardHtml item={item} key={index} classes={classes} version={version} updatePassed={props.updatePassed}/>
            </SwiperSlide>
        )
    }
    const onSlideNextTransition = function(swipeInfo) {
        let { activeIndex } = swipeInfo;
        /**
         * ????????? ???????????? ?????? ??? ???????????? ??? ??????????????? ???????????? ????????????.
         */
        if( activeIndex >= (CardIndex-1) && CardIndex != originCardList.length) {
            let pinIndex = CardIndex + UNIT_SIZE > originCardList.length ? CardIndex + UNIT_SIZE : originCardList.length
            let dumyCardList = cardList.concat(originCardList.slice(CardIndex+1, pinIndex));
            setCardList(dumyCardList);
            setCardIndex(pinIndex)
        }
        setInitSlide(activeIndex);
    }

    return (
        <div className={classes.cardslideContainer}>
            <Swiper 
                initialSlide={initSlide}
                className={classes.carouselContainer}
                spaceBetween={50}
                // navigation={{hideOnClick : true}} 
                scrollbar={{draggable : true, dragSize : 50}}
                mousewheel={true}
                onSlideChange={onSlideNextTransition}
                virtual
            >
                {
                    (originCardList || []).map((item, idx) => renderCard(idx, item))
                }
            </Swiper>
        </div>
    )
}