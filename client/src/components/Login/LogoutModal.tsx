import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { useAuth } from '../../AuthContext';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

export const LogoutModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Typography variant="h6" component="h2">
                    Logout
                </Typography>
                <Typography variant="h6" component="h2">
                    Are you sure you want to logout?
                </Typography>
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Modal>
    );
};
