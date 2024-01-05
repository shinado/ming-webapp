import React from 'react';
import { Dialog, CircularProgress, DialogContent, Typography } from '@mui/material';

const LoadingDialog = ({ content, open }) => {
    return (
        <Dialog open={open}>
            <DialogContent style={{ textAlign: 'center', padding: '20px' }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    {content}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default LoadingDialog;