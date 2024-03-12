import { Stack } from "@fluentui/react";
//import styles from "./Answer.module.css";

interface Props {
    recommenededQuestionList: [];
    onRecommendedQuestionClicked: (value: string) => void;
}

export const SuggesedQuestion = ({ recommenededQuestionList, onRecommendedQuestionClicked }: Props) => {
    return (
        <Stack className="recommendedQuestionBlock">
            <Stack horizontal horizontalAlign="space-between">
                <h3>Tell me what’s on your mind, or pick a suggestion </h3>
            </Stack>
            <Stack className="recommendedQuestionList">
                {recommenededQuestionList.map((x, i) => {
                    return (
                        <a key={i} className="recommendedQuestion" title={x} onClick={() => onRecommendedQuestionClicked(x)}>
                            {`${x}`}
                        </a>
                    );
                })}
            </Stack>
        </Stack>
    );
};
