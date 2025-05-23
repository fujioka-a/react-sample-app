import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    triggerLabel: string;
    dialogTitle: string;
    dialogDescription: string;
    cancelLabel?: string;
    confirmLabel?: string;
}

export default function AlertDialog({
    triggerLabel,
    dialogTitle,
    dialogDescription,
    cancelLabel = 'Cancel',
    confirmLabel = 'OK',
}: AlertDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                {triggerLabel}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelLabel}</Button>
                    <Button onClick={handleClose} autoFocus>
                        {confirmLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}