import { Box, Rating } from "@mui/material";

export const RatingComp = ({ id, value, setValue, setConversations, ReadOnly = '' }) => {
    return <Box component="fieldset" borderColor="transparent" sx={{ display: 'flex', alignItems: 'center' }}>
        <Rating ReadOnly
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setConversations(prev => prev.map(item => {
                    if (item.id === id) {
                        item.aiReply.rating = newValue;
                    } return item;
                }))
            }}
        />
    </Box>
}