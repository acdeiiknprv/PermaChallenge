import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SearchModal = ({ open, onClose, onSearch }: {open: boolean, onClose: () => void, onSearch: (tempSearchTerm: string) => void}) => {
  const [tempSearchTerm, setTempSearchTerm] = useState('');

  const handleSearchClick = () => {
    onSearch(tempSearchTerm);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
    >
      <Box sx={style}>
        <h2 id="search-modal-title">Search Products</h2>
        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="Search products"
          type="text"
          fullWidth
          variant="outlined"
          value={tempSearchTerm}
          onChange={(e) => setTempSearchTerm(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleSearchClick} variant="contained">Search</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchModal;