import { Stack, PrimaryButton } from "@fluentui/react";
import { ErrorCircle24Regular } from "@fluentui/react-icons";
import "./Answer.scss";

//import styles from "./Answer.module.css";

interface Props {
    error: string;
    onRetry: () => void;
}

export const AnswerError = ({ error, onRetry }: Props) => {
    return (
        <Stack className="answerContainer" verticalAlign="space-between">
            <ErrorCircle24Regular aria-hidden="true" aria-label="Error icon" primaryFill="red" />
            <Stack.Item grow>
                <p className="answerText">{error}</p>
            </Stack.Item>
            <PrimaryButton className="retryButton" onClick={onRetry} text="Retry" />
        </Stack>
    );
};
