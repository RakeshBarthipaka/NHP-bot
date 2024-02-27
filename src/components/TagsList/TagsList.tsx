import { Paper, Stack, styled } from "@mui/material";
import styles from "./TagsList.module.css";
import { useContext } from "react";

// interface Props {
//     text: string;
//     value: string;
//     onClick: (value: string) => void;
// }

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

const tagsList = [
    {
        tagName: "Finance 5"
    },
    {
        tagName: "Market 12"
    },
    {
        tagName: "Investment 9"
    },
    {
        tagName: "Business 4"
    },
    {
        tagName: "Plans 2"
    }
];

export const TagsList = ({setTagClicked, setTagName}: any) => {

    return (
        <Stack direction="row" alignItems={"end"} justifyContent={"end"} spacing={2} marginRight={8}>
            {tagsList.map(tag => {
                return (
                    <Item
                        onClick={() => {
                            setTagName(
                                tag.tagName,
                                );
                                setTagClicked(true);
                        }}
                        className={styles.tagsStyle}
                    >
                        {tag.tagName}
                    </Item>
                );
            })}
        </Stack>
    );
};
