import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TextField } from "@mui/material";
import "./SearchBar.scss";

/* function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
        if (focused) {
            return "This field is being focused";
        }

        return "Helper text";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
} */

const SearchBar = () => {
    return (
        <form noValidate autoComplete="off">
            <FormControl hiddenLabel sx={{ width: "25ch" }} className="searchBar">
                {/* <OutlinedInput placeholder="Please enter text" /> */}
                {/* <MyFormHelperText /> */}
                <TextField variant="standard" placeholder="Please enter text" InputProps={{ disableUnderline: true }} />
                <span className="searchIcon">
                    <SearchOutlinedIcon />
                </span>
            </FormControl>
        </form>
    );
};

export default SearchBar;
