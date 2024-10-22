import { Box, Button, Modal, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import bulb from '../../assets/bulb.png';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    backgroundColor: 'secondary.main',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    p: 3,
};

const BasicModal = ({ open, handleClose, id, setConversations }) => {
    const [feedback, setFeedback] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        setConversations(prev => prev.map(item => {
            if (item.id === id)
                item.aiReply.feedback = feedback
            return item;
        }))
        handleClose()
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component='form' onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <img src={bulb} alt="bulb" style={{ width: '40px', height: '40px', marginRight: '1.2rem' }} />
                        Provide Additional Feedback
                    </Typography>
                    <CloseIcon sx={{ fontSize: '1.5rem' }} />
                </Box>
                <TextField
                    fullWidth
                    minRows={4}
                    multiline
                    value={feedback} required
                    // placeholder="Minimum 3 rows"
                    variant="outlined"
                    onChange={(e) => setFeedback(e.target.value)}
                    sx={{ width: '100%', bgcolor: '#FFF' }}
                />
                <Box sx={{ textAlign: 'right' }}>
                    <Button type="submit" variant="contained" sx={{ border: 'none', bgcolor: 'primary.main', color: '#000', px: 3 }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default BasicModal;
