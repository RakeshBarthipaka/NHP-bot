import { parseSupportingContentItem } from "./SupportingContentParser";

import "./SupportingContent.scss";

interface Props {
    supportingContent: string[];
}

export const SupportingContent = ({ supportingContent }: Props) => {
    return (
        <ul className='supportingContentNavList'>
            {supportingContent.map((x, i) => {
                const parsed = parseSupportingContentItem(x);

                return (
                    <li className='supportingContentItem'>
                        <p className='supportingContentItemHeader'>{parsed.title}</p>
                        <p className='supportingContentItemText'>{parsed.content}</p>
                    </li>
                );
            })}
        </ul>
    );
};
