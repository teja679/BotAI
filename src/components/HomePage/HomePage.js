import { Box, Button, Card, Drawer, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import icon from '../../assets/icon.png'
import edit from '../../assets/edit.png'


export const CardComponent = ({ text }) => {
    return (
        <Card sx={{ border: 'none', p: 2, textAlign: 'left', boxShadow: 1 }}>
            <Typography variant='h3' sx={{ color: 'text.primary' }}>
                {text}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', py: 1 }}>
                Get immediate AI generated response
            </Typography>
        </Card>
    );
};

const HomePage = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
        <Box sx={{
            display: 'flex', justifyContent: 'space-around',
            boxSizing: 'border-box',
            backgroundColor: 'primary.main', p: 1, py: 2
        }}>
            {icon && <img src={icon} alt='icon' style={{ width: '32px', height: '32px' }} />}
            <Typography variant='h2'>New Chat</Typography>
            {edit && <img src={edit} alt='edit' style={{ width: '32px', height: '32px' }} />}

        </Box>
    )
    return ( /* set height 100% for small devices md & sm */
        <Box width='100%' height='100vh' sx={{
            display: 'flex',
            boxSizing: 'border-box',
        }}>
            {/* New Chat */}
            <Box width='20%' sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
            >{DrawerList}
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Box>
            <Box width='80%' height='100vh' sx={{
                p: 2, flexGrow: 1, backgroundColor: 'secondary.main', boxSizing: 'border-box',
                display: 'flex', justifyContent: 'space-between',
                flexDirection: 'column', height: { xs: '100%', sm: '100%', md: '100%' }, width: { xs: '100%', sm: '100%', md: '100%' },
            }}>
                <Box sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MenuIcon onClick={toggleDrawer(true)} sx={{ color: 'primary.main', display: { xs: 'block', sm: 'block', md: 'none' } }} />
                    <Typography variant='h2' sx={{ color: 'primary.main' }}>Bot AI</Typography>
                </Box>
                <Box>
                    <Box sx={{ my: 10, textAlign: 'center' }}>
                        <Typography variant='h2'>How Can I Help You Today?</Typography>
                        {icon && <img src={icon} alt='icon' style={{ marginTop: '1rem', width: '100px', height: '100px' }} />}
                    </Box>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        {['Hello, How are you?', 'What can I assist you with?', 'Need AI support?', 'Start a conversation'].map((text, index) => (
                            <Grid item xs={12} md={6} lg={6} key={index}>
                                <CardComponent text={text} />
                            </Grid>
                        ))}
                    </Grid>

                    <Stack spacing={2} direction="row" width='100%' sx={{ my: 2, boxSizing: 'border-box' }}>
                        <TextField
                            sx={{ width: '80%', backgroundColor: '#FFF' }}
                            placeholder="Ask me anything..."
                            variant="outlined"
                        />
                        <Button sx={{ width: "10%" }} variant="contained">Ask</Button>
                        <Button sx={{ width: "10%" }} variant="contained">Save</Button>
                    </Stack>
                </Box>
            </Box>
        </Box >
    );
};

export default HomePage
