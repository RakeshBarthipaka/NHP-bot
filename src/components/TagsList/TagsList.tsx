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

export const TagsList = ({ setTagClicked, setTagName, toggleKeywordAnalysis, tags }: any) => {
    // console.log(tags, 'tags');
    // for (const key in tags) {
    //     if (tags.hasOwnProperty(key)) {
    //       console.log(`${key}: ${tags[key]}`);
    //     }
    //   }
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
