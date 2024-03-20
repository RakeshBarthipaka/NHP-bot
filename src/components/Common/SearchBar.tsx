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

interface Props {
    searchKey: string,
    setSearchKey: (value: any) => void;
}

const SearchBar = ({searchKey, setSearchKey} : Props ) => {
    return (
        <form noValidate autoComplete="off">
            <FormControl hiddenLabel sx={{ width: "100%" }} className="searchBar">
                {/* <OutlinedInput placeholder="Please enter text" /> */}
                {/* <MyFormHelperText /> */}
                <TextField
                    value={searchKey}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchKey(event.target.value);
                    }}
                    variant="standard"
                    placeholder="Search"
                    sx={{ width: "100%" }}
                    InputProps={{ disableUnderline: true }}
                />
                <span className="searchIcon">
                    <SearchOutlinedIcon />
                </span>
            </FormControl>
        </form>
    );
};

export default SearchBar;
