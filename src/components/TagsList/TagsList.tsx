import { Paper, Stack, styled } from "@mui/material";
import "./TagsList.scss";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

export const TagsList = ({ setTagClicked, setTagName, toggleKeywordAnalysis, tags }: any) => {
    let tagsArr = Object?.keys(tags);

    return (
        <Stack className="TagsListDiv">
            {tagsArr?.map((tag: any) => {
                return (
                    <Item
                        onClick={() => {
                            setTagName(tag);
                            setTagClicked(true);
                            toggleKeywordAnalysis();
                        }}
                        className="tagsStyle"
                    >
                        {tag} <b className="tagCount">{tags[tag]}</b>
                    </Item>
                );
            })}
        </Stack>
    );
};
