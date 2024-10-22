import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import personImg from '../../assets/person.png'
import botImg from '../../assets/icon.png'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const Conversations = ({ conversations }) => {
    const [liked, setLiked] = useState(false)
    const [disLiked, setDisLiked] = useState(false)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflowY: 'auto',  // Enable scrolling
        }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {conversations.map((message, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        gap: '1rem',
                        backgroundColor: 'secondary.main',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        borderRadius: '10px',
                        padding: '10px',
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
                                    <>
                                        <ThumbUpOutlinedIcon
                                            onClick={() => setLiked(prev => !prev)}
                                            sx={{ color: liked ? 'primary.main' : 'grey' }}
                                        />
                                        <ThumbDownAltOutlinedIcon
                                            onClick={() => setDisLiked(prev => !prev)}
                                            sx={{ color: disLiked ? 'primary.main' : 'grey' }}
                                        />
                                    </>
                                )}
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}

export default Conversations;
