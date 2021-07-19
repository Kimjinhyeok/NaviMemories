import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import DrawerMenuComponent from './Drawer'
import Cookies from 'js-cookie'

export default function AppBarComponent(props) {

    const drawerWidth = 240;
    
    const [open, setOpen] = useState(true);
    
    const useStyle = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        title: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        nested_1: {
            marginLeft: theme.spacing(2),
            width: `calc(100% - ${theme.spacing(2)}px)`
        },
        nested_2: {
            marginLeft: theme.spacing(4),
            width: `calc(100% - ${theme.spacing(4)}px)`
        }
    }));
    
    const userName = Cookies.get('username');
    const isLogin = Cookies.get('authtoken') ? true : false;
    const classes = useStyle();

    return (
        <div className="root">
            <AppBar position="static" 
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                {...props}
                >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                        onClick={() => { setOpen(true) }}
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Title</Typography>
                    {
                        userName ? 
                        <span>{userName}님</span>
                        : 
                        <Button type="button" color="inherit"><Link to="/login">Login</Link></Button>
                    }
                </Toolbar>
            </AppBar>
            <DrawerMenuComponent
                classes={classes}
                setOpen={setOpen}
                open={open}
                isLogin={isLogin}
                {...props}
            />
        </div>
    )
}