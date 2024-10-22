import React, { useState, useCallback } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Button, Card, Drawer, Grid, Stack, TextField, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import icon from '../../assets/icon.png';
import edit from '../../assets/edit.png';
import { data } from '../../data';
import ChatLayout from '../ChatLayout/ChatLayout';
import { v4 as uuidv4 } from 'uuid';
import PastConversations from '../PastConversationsLayout/PastConversations';

const CardComponent = React.memo(({ text }) => (
    <Card sx={{ border: 'none', p: 2, textAlign: 'left', boxShadow: 1 }}>
        <Typography variant='h3' sx={{ color: 'text.primary' }}>
            {text}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary', py: 1 }}>
            Get immediate AI-generated response
        </Typography>
    </Card>
));

const DrawerList = ({ setShowPastConversations }) => (
    <Box
        sx={{
            boxSizing: 'border-box',
        }}
    >
        <Box sx={{
            backgroundColor: 'primary.main',
            p: 1,
            py: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
            {icon && <img src={icon} alt='icon' style={{ width: '32px', height: '32px' }} />}
            <Typography variant='h3' sx={{ fontSize: '1.1rem' }}>
                New Chat
            </Typography>
            {edit && <img src={edit} alt='edit' style={{ width: '32px', height: '32px' }} />}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h3' sx={{
                fontSize: '1.1rem',
                backgroundColor: 'primary.main',
                width: 'fit-content',
                margin: 'auto', p: 2, cursor: 'pointer',
                borderRadius: '1rem'
            }} onClick={() => setShowPastConversations(prev => !prev)}>
                Past Conversations
            </Typography>

        </Box>
    </Box>
);

const HomePage = () => {
    const [query, setQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [showPastConversations, setShowPastConversations] = useState(false)
    const [pastConversations, setPastConversations] = useState(JSON.parse(localStorage.getItem('pastConversations')) || []);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const findResponse = (query) => {
        if (['hi', 'hello', 'how are you'].includes(query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ' '))) {
            return "Hi, how can I help you";
        }
        const match = data.find((item) => item.question.toLowerCase().includes(query.toLowerCase()));
        return match ? match.response : 'Sorry, I couldn’t find the details. Please try rephrasing your query.';
    };
    const saveConversations = () => {
        const prevData = JSON.parse(localStorage.getItem('pastConversations') || '[]');

        // Check if the current conversation is already in the previous data to avoid duplicates.
        // if (!prevData.some(conv => JSON.stringify(conv) === JSON.stringify(conversations))) {
        if (!prevData.some(conv => JSON.stringify(conv) === JSON.stringify(conversations))) {
            const updatedConversations = [...prevData, ...conversations];

            setPastConversations(updatedConversations);

            localStorage.setItem('pastConversations', JSON.stringify(updatedConversations));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const ourQuery = {
            sender: 'You',
            text: query,
            time: new Date().toLocaleTimeString(),
        };
        // setConversations((prev) => [...prev, newMessage]);

        const aiReply = {
            sender: 'Soul AI',
            text: findResponse(query),
            time: new Date().toLocaleTimeString(),
            rating: 0,
            feedback: ''
        };
        setConversations((prev) => [...prev, { id: uuidv4(), ourQuery, aiReply }]);
        setQuery('');
    }

    return (
        <Box width='100%' height='100vh' sx={{ display: 'flex', boxSizing: 'border-box', position: 'relative' }}>
            <Box width='20%' sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <DrawerList setShowPastConversations={setShowPastConversations} />
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <DrawerList setShowPastConversations={setShowPastConversations} />
                </Drawer>
            </Box>
            <Box
                width='80%'
                height='100vh'
                sx={{
                    flexGrow: 1,
                    backgroundColor: 'secondary.main',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'fixed',
                        left: { xs: 0, sm: 0, md: '20%' },
                        right: 0,
                        zIndex: 1000,
                        padding: '1rem',
                    }}
                >
                    <MenuIcon
                        onClick={toggleDrawer(true)}
                        sx={{ color: 'primary.main', display: { xs: 'block', sm: 'block', md: 'none' } }}
                    />
                    <Typography variant='h2' sx={{ color: 'primary.contrastText' }}>
                        Bot AI
                    </Typography>
                </Box>

                {/* Chat Layout */}
                <Box sx={{
                    flexGrow: 1,
                    // overflowY: 'scroll',
                    mt: 8,
                    mx: 1,
                    position: 'absolute',
                    bottom: '5.5rem',
                    top: '0.7rem',  // Add this to prevent overlap with the header
                    width: '-webkit-fill-available'
                }}>
                    {showPastConversations ? <PastConversations pastConversations={pastConversations} /> :
                        conversations.length > 0 ? (
                            <ChatLayout conversations={conversations} setConversations={setConversations} />
                        ) : (
                            <>
                                <Box sx={{ my: { xs: 6, sm: 6, md: 10 }, textAlign: 'center' }}>
                                    <Typography variant='h2'>How Can I Help You Today?</Typography>
                                    {icon && <img src={icon} alt='icon' style={{ marginTop: '1rem', width: '100px', height: '100px' }} />}
                                </Box>
                                <Box sx={{ marginBottom: '1rem' }}>
                                    <Grid container spacing={2}>
                                        {['Hello, How are you?', 'What can I assist you with?', 'Need AI support?', 'Start a conversation'].map(
                                            (text, index) => (
                                                <Grid item xs={12} md={6} lg={6} sx={{ display: index === 3 && { xs: 'none', sm: 'none', md: 'block' } }} key={index}>
                                                    <CardComponent text={text} />
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                </Box>
                            </>
                        )}
                </Box>

                {/* Fixed Footer (Form) */}
                <Stack
                    component='form'
                    onSubmit={handleSubmit}
                    spacing={2}
                    direction='row'
                    // width='80%'
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: { xs: 0, sm: 0, md: '20%' },
                        right: 0,
                        padding: '1rem',
                        boxSizing: 'border-box',
                    }}
                >
                    <TextField
                        sx={{ width: '80%', backgroundColor: '#FFF', color: '#000' }}
                        placeholder='Ask me anything...'
                        value={query}
                        variant='outlined'
                        required
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type='submit' sx={{ width: '10%' }} variant='contained'>
                        Ask
                    </Button>
                    <Button onClick={saveConversations} sx={{ width: '10%' }} variant='contained'>
                        Save
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default HomePage;
