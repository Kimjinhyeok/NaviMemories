import React from 'react'
import {CssBaseline, Typography, Container} from '@material-ui/core'

export default function MainComponent () {

    const [values, setValues] = React.useState({
        cardList : []
    })
    const resolveRef = React.useRef(null);
    
    // React.useEffect(async () => {
    //     if(resolveRef.current) {
    //         resolveRef.current(values);
    //         resolveRef.current = null;
    //     }
    //     var response = await fetch(`mock_memories.json`);
    //     var cardList = await response.json();
    //     setValues({
    //         cardList : cardList
    //     })
    // }, [values.cardList])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
               <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </React.Fragment>
    )
}