import { Box, Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'

export default function CardComponent (props) {
    
    const useStyles = makeStyles((theme) => ({
        root : {
            margin : theme.spacing(2)
        },
        title : {
            backgroundColor : theme.palette.primary.main,
            color : theme.palette.primary.contrastText
        },
        c_content : {
            display : 'flex',
            flexDirection : 'column',
            textAlign : 'left',
        },
        chapter : {
            display : 'flex',
            flexDirection : 'row',
        },
        verse_text : {
            marginTop : theme.spacing(1),
            marginBottom : theme.spacing(1)
        },
        category : {
            textAlign : 'end',
            color : theme.palette.secondary.light
        }
    }))
    const classes = useStyles();
    const [memory] = useState({
        bible_code : props.item.bible_code,
        card_num : props.item.card_num,
        category : props.item.category,
        chapter : props.item.chapter,
        f_verse : props.item.f_verse,
        l_verse : props.item.l_verse,
        series_code : props.item.series_code,
        theme : props.item.theme,
        verse_gae : props.item.verse_gae,
        verse_kor : props.item.verse_kor,
    })
    return (
        <Card className={classes.root}>
            <CardHeader title={memory.theme} className={classes.title}>
                <Box component="span">
                    <Typography color="textPrimary">{memory.theme}</Typography>
                </Box>
            </CardHeader>
            <CardContent className={classes.c_content}>
                <Box className={classes.chapter}>
                    <Typography>{memory.chapter}</Typography>:
                    <Typography color="textSecondary">{memory.f_verse}</Typography>
                    {
                        memory.l_verse ? <Fragment>~ <Typography color="textSecondary">{memory.l_verse}</Typography></Fragment> : <></>
                    }
                </Box>
                <Box className={classes.verse_text}>{memory.verse_gae}</Box>
                <Box className={classes.category}>{memory.category}</Box>
            </CardContent>
        </Card>
    )
}