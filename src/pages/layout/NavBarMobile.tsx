import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styles from "./Layout.module.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import CGLenseLogo from "../../assets/CGLense_app_logo_v3.png";
import { useSelector, useDispatch } from "react-redux";
import { set_history, set_answers, set_QnA, set_recommendedQnA, set_latestQuestion } from "../chat/chatSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from './Modal';

const drawerWidth = "70%";

export default function MobileNavBar() {
    const [isKebabMenu, setKebabMenu] = React.useState(false);
    const { color: themesColor, colorCode } = useSelector((state: any) => state.theme.color);
    const dispatch = useDispatch();

    const showHistory = () => {
        dispatch(set_history(true as any));
    };

    const resetChat = () => {
        dispatch(set_history(false as any)), dispatch(set_answers([] as any));
        dispatch(set_QnA([] as any));
        dispatch(set_recommendedQnA([] as any));
        dispatch(set_latestQuestion("" as any));
    };

    const showKebabMenu = () => {
      //@ts-ignore
        setKebabMenu((prevState: any) => !prevState);
    };

    return (
        <AppBar className={styles.headerContainerMobile} position="static" style={{ backgroundColor: `${colorCode}`, height: "62px" }}>
            <Toolbar>
                <div className={styles.headerContainerMobileLogo}>
                    <NavLink to="/home">
                        <IconButton>
                            <img src={CGLenseLogo} height={20} />
                        </IconButton>
                    </NavLink>
                    <NavLink to="" onClick={resetChat}>
                        <i className="material-icons" style={{ color: "white" }}>
                            add
                        </i>
                        <div style={{ fontSize: "12px", color: "white" }}>New Chat</div>
                    </NavLink>
                    <NavLink to="" onClick={resetChat}>
                        <i className="material-icons" style={{ color: "white" }}>
                            rotate_left
                        </i>
                        <div style={{ fontSize: "12px", color: "white" }}>Reset Chat</div>
                    </NavLink>
                    <NavLink to="" onClick={showHistory}>
                        <i className="material-icons" style={{ color: "white" }}>
                            history
                        </i>
                        <div style={{ fontSize: "12px", color: "white" }}>Chat History</div>
                    </NavLink>
                    <MoreVertIcon onClick={showKebabMenu} />
                    <Modal
                        shown={isKebabMenu}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}
