import React, { useContext } from 'react'
import CardHtml from './card_html'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation } from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Context } from '../../../Utils/Context';

  // install Swiper modules
//   SwiperCore.use([Virtual, Scrollbar, Mousewheel]);
  
const UNIT_SIZE = 30;
/**
 * @typedef CardSlideProps
 * @property {Array} item
 * @param {CardSlideProps} props 
 * @returns 
 */
export default function CardSlideComponent(props) {

    const originCardList = props.item ?? [];
    const initSlide = props.initSlide ?? [];
    const setInitSlide = props.setInitSlide;
    
    const [CardIndex, setCardIndex] = React.useState(originCardList.length > UNIT_SIZE ? UNIT_SIZE : originCardList.length );
    const [cardList, setCardList] = React.useState(originCardList.slice(0, CardIndex));

    const {state : {version}} = useContext(Context);

    function renderCard(index, item) {
        return (
            <SwiperSlide virtualIndex={'v'+index} key={index}>
                <CardHtml item={item} key={index} version={version} updatePassed={props.updatePassed}/>
            </SwiperSlide>
        )
    }
    const onSlideNextTransition = function(swipeInfo) {
        let { activeIndex } = swipeInfo;
        /**
         * 카드가 한계치에 왔을 때 임의치를 더 가져오거나 마무리를 가져온다.
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
        <div className={'h-full w-full'}>
            <Swiper
                modules={[Virtual, Navigation]} 
                init={initSlide}
                className={'h-full my-auto mx-[1vw] overflow-hidden touch-pan-y'}
                spaceBetween={50}
                navigation={true} 
                // scrollbar={{draggable : true, dragSize : 50}}
                mousewheel={true}
                onSlideChange={onSlideNextTransition}
                virtual
            >
                {
                    originCardList.map((item, idx) => renderCard(idx, item))
                }
            </Swiper>
        </div>
    )
}