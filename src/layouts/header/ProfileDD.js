import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "../../../assets/images/users/8.jpg";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  Snackbar,
  Alert
} from "@mui/material";
import { Close } from "@material-ui/icons";
import UserForm from "../../../pages/user_form";
import { useRouter } from "next/router";

const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const router = useRouter()

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleOpenModal = () => {
    console.log('open modal');
    setOpenModal(true)
  };

  React.useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [])

  const logOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('phone')
    localStorage.removeItem('password')
    router.push('/login')
  };

  const handleCloseModal = (event, reason) => {
    if (reason === "backdropClick") {
        console.log(reason);
    } else {
        setOpenModal(false)
    }
  };

  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };

  const closeFailedToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailedToast(false);
  };

  const closeSuccessToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessToast(false);
  };

  return (
    <>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openSuccessToast} autoHideDuration={6000} onClose={closeSuccessToast}>
        <Alert onClose={closeSuccessToast} severity="success" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
          L'oppération a été effectué avec succée
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openFailedToast} autoHideDuration={6000} onClose={closeFailedToast}>
        <Alert onClose={closeFailedToast} severity="error" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
          Vous avez rencontré un probléme !
        </Alert>
      </Snackbar>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <div style={{display:"flex", justifyContent:"end"}}>
            <IconButton onClick={handleCloseModal}>
              <Close fontSize='large'/>
            </IconButton>
          </div>
          <UserForm
            showSuccessToast={showSuccessToast}
            showFailedToast={showFailedToast}
          />
        </DialogContent>
      </Dialog>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">

          <Image
            src={userimg}
            placeholder="blur"
            alt=""
            width="30"
            height="30"
            className="roundedCircle"
          />

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {user}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton onClick={handleOpenModal} >
                {/* <ListItemText primary="إضافة مستخدم " style={{ display:'flex', justifyContent:'center', fontWeight:'bold', fontSize:'24px'}} /> */}
                <Button fullWidth variant="contained" color="grey" style={{fontSize:"24px"}}>
                  Ajouter un utilisateur
                </Button>
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
              <Button onClick={logOut} fullWidth variant="contained" color="primary" style={{fontSize:"24px"}}>
                Déconnecter
              </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
