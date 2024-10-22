import { Box, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import personImg from '../../assets/person.png'
import botImg from '../../assets/icon.png'
import { RatingComp } from '../RatingComp';

const PastChat = ({ message }) => {
    return <Box key={message.sender + message.time} sx={{
        display: 'flex',
        gap: '1rem',
        backgroundColor: 'primary.main',
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
                        {message.rating > 0 && <RatingComp value={message.rating} ReayOnly={'readonly'} />}
                    </Box>
                )}
            </Stack>
            {message.feedback &&
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Typography variant='body1' sx={{ fontWeight: 'bolder' }}>Feedback: </Typography>
                    <Typography variant='body1'>{message.feedback}</Typography>
                </Box>
            }
        </Box>
    </Box>
}

export default PastChat