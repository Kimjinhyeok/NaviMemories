import { Container } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router';
import AppBarComponent from './appbar';
import RecitationCardListComponent from './Cards';
import UnitPageComponent from './Check/Unit/unitPage';
import ExamMainPage from './Check/Exam';
import IntroPageComponent from './intro.page';
import OYOIndex from './OYO';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Provider as ContextProvider } from '../Utils/Context';


export default function MainComponent(props) {

    const useStyle = styled(theme => ({
        root_container : {
            height : '100%',
            maxHeight : '100%',
            display : 'flex',
            flexDirection : 'column',
            overflowY: 'auto'
        },
        main_content : {
            flex: 1,
            maxHeight: 'calc(100% - 64px)'
        }
    }))
    const classes = useStyle();
    
    const checkUserSignuped = function() {
        var authtoken = Cookies.get('authtoken');
        var username = Cookies.get('username');
        if(authtoken && !username) {
            var decoded = jwtDecode(authtoken);
            username = decoded.u_n;
            Cookies.set('username', username);
        }
    }

    useEffect(() => {
        checkUserSignuped();
    }, [])
    return (
        <div className={classes.root_container}>
            <ContextProvider>
                <AppBarComponent {...props}     />
                <Container className={classes.main_content}>
                    <Routes>
                        <Route path="/test/:path" element={<ExamMainPage  />} />
                        <Route path="/check" element={<UnitPageComponent />}/>
                        <Route path="/recitation/:category" element={<RecitationCardListComponent  />} />
                        <Route path="/oyo/:path" element={<OYOIndex />} />
                        <Route path="/" element={<IntroPageComponent  />} />
                    </Routes>
                </Container>
            </ContextProvider>
        </div>
    )
}