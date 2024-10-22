import { Box, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ChatComp from '../Chat';
import PastChat from './PastChat';


const PastConversations = ({ pastConversations, isPastConversations = false }) => {
    console.log('past', pastConversations)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            overflowY: 'auto',  // Enable scrolling
        }}>
            <Typography variant='h2'>Today's Chats</Typography>
            <Stack spacing={2} sx={{
                flexGrow: 1,
            }}>
                {pastConversations.length > 0 && pastConversations.map((conversation, index) => (
                    <Box key={conversation.id}
                        sx={{
                            m: 0, display: 'flex', flexDirection: 'column', backgroundColor: 'primary.main',
                            gap: '1rem',
                            borderRadius: '10px',
                        }}
                    >
                        <PastChat message={conversation.ourQuery} />
                        <PastChat message={conversation.aiReply} />
                    </Box>
                ))
                }

                <div ref={bottomRef} />
            </Stack >
        </Box >
    )
}

export default PastConversations;
