import { Fab, Box, Zoom, Typography } from "@mui/material";
import { useState } from 'react';

const ItemFab = () => {
    const [open, setOpen] = useState(false);

    const toggleFab = () => {
        setOpen((prev) => !prev);
    };

    return(
    <Box
        sx={{
        position: "fixed",
        bottom: 40,
        right: 40,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "flex-end",
        }}
    >
        {/* Main FAB */}
        <Fab
        color="success"
        onClick={toggleFab}
        aria-label="toggle actions"
        sx={{ zIndex: 2 }}
        >
            <ion-icon size="large" name="pencil" style={{ cursor: 'pointer' }}></ion-icon>
        </Fab>

        {/* Sub FABs */}
        <Zoom in={open}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="body2">물품추가</Typography>
            <Fab
            size="large"
            color="default"
            aria-label="add item"
            sx={{ ml: 2 }}
            >
                <ion-icon size="large" name="add" style={{ cursor: 'pointer' }}></ion-icon>
            </Fab>
        </Box>
        </Zoom>

        <Zoom in={open}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="body2">물품삭제</Typography>
            <Fab
            size="large"
            color="default"
            aria-label="delete item"
            sx={{ ml: 2 }}
            >
                <ion-icon size="large" name="trash" style={{ cursor: 'pointer' }}></ion-icon>
            </Fab>
        </Box>
        </Zoom>
    </Box>
    )
};

export default ItemFab