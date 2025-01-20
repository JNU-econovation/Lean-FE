import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import PropTypes from 'prop-types';

const ConfirmDialog = ({title, description, closeText, confirmText, onConfirm, open, onClose, isRental}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
            <DialogContent>
            <DialogContentText id="delete-dialog-description">
                {description}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color={isRental?'':''}>
                {closeText}
            </Button>
            <Button onClick={onConfirm} color={isRental?'primary':'error'} autoFocus>
                {confirmText}
            </Button>
            </DialogActions>
        </Dialog>
    )
};

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    closeText: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    isRental: PropTypes.bool,
};


export default ConfirmDialog;