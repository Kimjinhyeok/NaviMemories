
import React from 'react'
import PrepareForGuest from './forGuest';
import PrepareForMember from './forMember';

export default  function RecitationExamPrepareComponent(props) {

  return (
    // <PrepareForGuest {...props} />
    <PrepareForMember {...props}/>
  )
}