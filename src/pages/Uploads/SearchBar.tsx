import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

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
            <FormControl sx={{ width: "25ch" }}>
                <OutlinedInput placeholder="Please enter text" />
                {/* <MyFormHelperText /> */}
            </FormControl>
        </form>
    );
};

export default SearchBar;
