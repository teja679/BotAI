import { Box, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import personImg from '../assets/person.png'
import botImg from '../assets/icon.png'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import BasicModal from './Modal/Modal';
import { RatingComp } from './RatingComp';

const ChatComp = ({ message, setConversations, id }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState(0)
    const [liked, setLiked] = useState(false)
    return <Box key={message.sender + message.time} sx={{
        display: 'flex',
        gap: '1rem',
        backgroundColor: 'secondary.main',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'left'
    }}>
        {message.sender === 'Soul AI' ? (
            <img width='70px' height='70px' src={botImg} alt='bot-ai' />
        ) : (
            <img src={personImg} alt='person' style={{ borderRadius: '50%' }} />
        )}
        <Box>
            <Typography variant='h3'>{message.sender}</Typography>
            <Typography variant='body1'>{message.text}</Typography>
            <Stack spacing={2} direction='row' sx={{ mt: 1.2, alignItems: 'center' }}>
                <Typography variant='body2'>{message.time}</Typography>
                {message.sender === 'Soul AI' && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            '&:hover .like-icon, &:hover .dislike-icon': {
                                visibility: 'visible',
                            },
                        }}
                    >
                        <ThumbUpOutlinedIcon
                            onClick={() => setLiked((prev) => true)}
                            className="like-icon"
                            sx={{
                                color: 'grey',
                                fontSize: '1rem',
                                visibility: 'hidden', // Hidden by default
                            }}
                        />
                        <ThumbDownAltOutlinedIcon
                            onClick={handleOpen}
                            // onClick={() => setDisLiked((prev) => !prev)}
                            className="dislike-icon"
                            sx={{
                                // color: disLiked ? 'primary.main' : 'grey',
                                color: 'grey',
                                fontSize: '1rem',
                                visibility: 'hidden', // Hidden by default
                            }}
                        />
                        <BasicModal open={open} handleClose={handleClose} id={id} setConversations={setConversations} />
                        {liked && <RatingComp id={id} value={value} setValue={setValue} setConversations={setConversations} />}
                    </Box>
                )}
            </Stack>
            {message.feedback &&
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bolder' }}>Feedback: </Typography>
                    <Typography variant='body1'>{message.feedback && message.feedback}</Typography>
                </Box>
            }
        </Box>
    </Box>
}

export default ChatComp