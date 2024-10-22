import { Box, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import personImg from '../../assets/person.png'
import botImg from '../../assets/icon.png'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import BasicModal from '../Modal/Modal';
import { RatingComp } from '../RatingComp';
import ChatComp from '../Chat';


const ChatLayout = ({ conversations, setConversations }) => {
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversations]);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflowY: 'auto',  // Enable scrolling
        }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {conversations.map((conversation, index) => (
                    <Box key={conversation.id} sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <ChatComp message={conversation.ourQuery} />
                        <ChatComp message={conversation.aiReply} setConversations={setConversations} id={conversation.id} />
                    </Box>
                ))}

                <div ref={bottomRef} />
            </Stack>
        </Box>
    )
}

export default ChatLayout;
