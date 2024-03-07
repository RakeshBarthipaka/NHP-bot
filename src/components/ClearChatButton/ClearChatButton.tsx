import { Text } from "@fluentui/react";
import { Delete24Regular } from "@fluentui/react-icons";

import "./ClearChatButton.scss";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export const ClearChatButton = ({ className, disabled, onClick }: Props) => {
    return (
        <div className={`container ${className ?? ""} ${disabled && 'disabled'}`} onClick={onClick}>
            <Delete24Regular />
            <Text>{"Clear chat"}</Text>
        </div>
    );
};
