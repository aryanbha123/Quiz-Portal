import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "../../redux/reducers/userSlice";

export default function Toast({message = '' , isOpen = false, type =''}) {

  const {modal} = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal({
        isOpen: false,
        message: '',
        type: '',
    }))
  }
  return (
    <Snackbar
    anchorOrigin={{vertical:'bottom', horizontal:'right'}}
      open={modal.isOpen}
      autoHideDuration={3000}
      onClose={closeModal}
    >
      <Alert
        onClose={closeModal}
        severity={modal.type}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {modal.message}
      </Alert>
    </Snackbar>
  )
}
