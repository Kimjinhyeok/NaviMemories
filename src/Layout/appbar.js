import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import DrawerMenuComponent from './Drawer'
import cookies from '../Data/cookies'

export default function AppBarComponent(props) {

    const drawerWidth = 240;
    
    const history = props.history;
    
    const useStyle = styled((theme) => ({
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
            flexGrow: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        username: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
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
    
    const userName = cookies.get('userName');
    const isLogin = cookies.isLogin();
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(cookies.get('collapseDrawer'));

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = function() {
        cookies.reset();
        history.push('/');
        window.location.reload();
    }
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
                        onClick={() => { setOpen(true); cookies.set('collapseDrawer', true) }}
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}><Link to="/" >Navigator Bible Recitation</Link></Typography>
                    {
                        userName ? 
                        <div>
                            <Button
                                aria-controls="simple-menu" 
                                aria-haspopup="true" 
                                color="inherit"
                                onClick={handleClick}
                            >
                                <span className={classes.username}>{userName}</span>님
                            </Button>   
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logout}>로그아웃</MenuItem>
                            </Menu>
                        </div>
                        : 
                        <Button type="button" color="inherit"><Link to="/login">로그인</Link></Button>
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