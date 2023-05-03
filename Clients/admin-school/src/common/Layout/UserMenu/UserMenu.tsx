import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FC } from "react";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import LoginIcon from '@material-ui/icons/Input';
import UserIcon from '@material-ui/icons/Person';
import authServices from "../../../services/AuthServices";
import { IUser } from "../../interface/userInterface";
import useStyles from "./style";

interface UserMenuProps {
  anchorEl: any;
  handleClose: (e?: any) => void;
  currentUser: IUser | null;
}

const UserMenu: FC<
  { anchorEl: any } & { handleClose: (e?: any) => void } & {
    currentUser: IUser | null;
  }
> = (props: any) => {

  const { anchorEl, handleClose, currentUser } = props as UserMenuProps;

  const history = useHistory();

  const classes = useStyles();

  const handleLogout = () => {

    authServices.signOut();

    history.replace("/login");
  };


  const handleMyAccount = () => {
    history.push("/user/profile");
    handleClose();
  };


  const redirect = (e: string) => () => {
    history.push(e);
    handleClose();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted={true}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={10}
      classes={{
        paper: classes.menu,
      }}
    >  <div className={classes.compte}>
        <UserIcon className={classes.coloredIcon} />
        <MenuItem onClick={handleMyAccount}>Mon compte</MenuItem>
      </div>
      <div className={classes.deconnecte}>
        <LoginIcon className={classes.coloredIcon} />
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </div>
    </Menu>


  );
};

export default UserMenu;
