import styles from "./UserChatMessage.module.css";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useSelector } from "react-redux";


interface Props {
    message: string;
}

export const UserChatMessage = ({ message }: Props) => {
    let userName = localStorage.getItem("userName") || "J.Crew";
    const {colorCode} = useSelector((state:any)=>state.theme.color)

    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <div style={{whiteSpace:"pre-line"}}> {message}</div>
            </div>
            <Avatar sx={{ bgcolor: colorCode, border: `3px solid ${colorCode}` }} alt={userName} src="/" />
        </div>
    );
};
