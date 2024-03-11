import { Paper, Stack, styled } from "@mui/material";
import "./TagsList.scss";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

const tagsList = [
    {
        tagName: "Finance",
        tagCount: 12
    },
    {
        tagName: "Market",
        tagCount: 5
    },
    {
        tagName: "Investment",
        tagCount: 2
    },
    {
        tagName: "Business",
        tagCount: 7
    },
    {
        tagName: "Plans",
        tagCount: 6
    }
];

export const TagsList = ({ setTagClicked, setTagName, toggleKeywordAnalysis }: any) => {
    return (
        <Stack direction="row" alignItems={"end"} justifyContent={"end"} marginBottom={3} spacing={2} marginRight={8}>
            {tagsList.map(tag => {
                return (
                    <Item
                        onClick={() => {
                            setTagName(tag.tagName);
                            setTagClicked(true);
                            toggleKeywordAnalysis();
                        }}
                        className="tagsStyle"
                    >
                        {tag.tagName} <b className="tagCount">{tag.tagCount}</b>
                    </Item>
                );
            })}
        </Stack>
    );
};
