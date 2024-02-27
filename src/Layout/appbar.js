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
    
    const userName = cookies.get('userName');
    const isLogin = cookies.isLogin();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(cookies.get('collapseDrawer'));

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
        cookies.reset();
        history.push('/');
        window.location.reload();
    }
    const handleOpenMenu = () => {
        setOpen(true); 
        cookies.set('collapseDrawer', true)
    }
    return (
        <div className="flex">
            <AppBar position="static" 
                {...props}
                >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={`mr-1 ${ open && 'hidden' }`}
                        onClick={handleOpenMenu}
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={'grow overflow-hidden whitespace-nowrap text-ellipsis'}><Link to="/" >Navigator Bible Recitation</Link></Typography>
                    {
                        userName ? 
                        <div>
                            <Button
                                aria-controls="simple-menu" 
                                aria-haspopup="true" 
                                color="inherit"
                                onClick={handleClick}
                            >
                                <span className={'overflow-hidden whitespace-nowrap text-ellipsis'}>{userName}</span>님
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
                setOpen={setOpen}
                open={open}
                isLogin={isLogin}
                {...props}
            />
        </div>
    )
}