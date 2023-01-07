import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button} from '@mui/material'
import Slide from '@mui/material/Slide';

const DeleteDialogComponent = (props) => {

  const {open, onClickOnCancel, onClickOnDelete} = props

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClickOnCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure the comment need to be deleted?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickOnCancel}>Cancel</Button>
          <Button onClick={onClickOnDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteDialogComponent