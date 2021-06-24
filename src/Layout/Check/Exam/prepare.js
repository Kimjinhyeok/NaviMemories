
import React from 'react'
import PrepareForGuest from './Prepare/forGuest';
import PrepareForMember from './Prepare/forMember';

export default  function RecitationExamPrepareComponent(props) {

  return (
    // <PrepareForGuest {...props} />
    <PrepareForMember {...props}/>
  )
}