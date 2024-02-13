import {
    Grid,
    Button,
} from '@mui/material';
import { useSelector } from "react-redux";


export const EmailConfirm = (props:any) => {
    const { colorCode } = useSelector((state: any) => state.theme.color);

    const handleConfirm=(Confirmation:string)=>{
        if (Confirmation==="Yes"){
            localStorage.setItem("patientemailconfirm", JSON.stringify(true))
            localStorage.setItem("patientemail", props.patientemail)
            props.onExampleClicked(Confirmation)
        }
        else{
            props.onExampleClicked(Confirmation)
        }

    }
    return (
        <Grid display="flex" gap={2} marginBottom={2}>
            <Button size='small' variant="contained" style={{background:colorCode}} onClick={()=>handleConfirm("Yes")}>Yes</Button>
            <Button size='small' variant="contained" style={{background:colorCode}} onClick={()=>handleConfirm("No")}>No</Button>
        </Grid>
    )
}
