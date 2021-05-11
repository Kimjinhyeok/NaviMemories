import React from 'react'
import {CssBaseline, Typography, Container} from '@material-ui/core'

export default function MainComponent () {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
               <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
            </Container>
        </React.Fragment>
    )
}