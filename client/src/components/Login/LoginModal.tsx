import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import appLogin from '../../services/login';
import { useAuth }  from '../../AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  async () => {

    try {
        if (!username || !password) throw new Error("Username and password are required");
        const response = await appLogin({username, password});
        if (response) {
            login(response.token);
        }
    } catch (error) {
        console.error("Error while logging in:", error);
    }

    onClose();
  };

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
          Login
        </Typography>
        <TextField
          required
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Modal>
  );
};
