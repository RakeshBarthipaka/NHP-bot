import { Text } from "@fluentui/react";
import { Settings24Regular } from "@fluentui/react-icons";

import "./SettingsButton.scss";

interface Props {
    className?: string;
    onClick: () => void;
}

export const SettingsButton = ({ className, onClick }: Props) => {
    return (
        <div className={`container ${className ?? ""}`} onClick={onClick}>
            <Settings24Regular />
            <Text>{"Developer settings"}</Text>
        </div>
    );
};
