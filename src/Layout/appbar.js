import { AppBar, Button, Collapse, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography, useTheme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import React, { useState } from 'react'
import clsx from 'clsx'
import { arrayCategories, Categories } from '../Data/categories'
import TopNaviDrawerComponent from './Drawer/topNaviDrawer'
import { Link } from 'react-router-dom'

export default function AppBarComponent(props) {

    const drawerWidth = 240;
    
    const [open, setOpen] = useState(true);
    const [recitationOpen, setRecitationOpen] = useState(false);
    const [subCt, setSubCt] = useState(null)
    const [categories, setCategories] = useState([])
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
            marginLeft: theme.spacing(2)
        },
        nested_2: {
            marginLeft: theme.spacing(4)
        }
    }));
    
    const classes = useStyle();


    const handleRecitationClick = () => {
        setRecitationOpen(!recitationOpen)
    }
    const handleSubCategory = (idx) => {
        subCt[idx] = !subCt[idx];
        setSubCt(subCt);
    }
    React.useEffect(async () => {
        var categories = await Categories.getCategories();
        var sortedCategories = arrayCategories(categories);
        var subCtClosed = sortedCategories.map(_ => false);
        setSubCt(subCtClosed);
        setCategories(sortedCategories);
        console.log(subCt);
    }, [])

    return (
        <div className="root">
            <AppBar position="static" 
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
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
                    <Button type="button" color="inherit"><Link to="/login">Login</Link></Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={open}
                anchor="left"
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider />
                
                <List>
                    <ListItem button onClick={handleRecitationClick}>
                        <ListItemText>암송</ListItemText>
                        {recitationOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={recitationOpen} unmountOnExit>
                        <List>
                            {categories.map((ct, idx) => {
                                return (
                                    <TopNaviDrawerComponent key={idx} category={ct} classes={classes}/>
                                )
                            })}
                        </List>
                    </Collapse>
                    <Divider />
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                </List>
            </Drawer>
        </div>
    )
}