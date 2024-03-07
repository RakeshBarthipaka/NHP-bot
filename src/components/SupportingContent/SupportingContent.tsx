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
                        <h4 className='supportingContentItemHeader'>{parsed.title}</h4>
                        <p className='supportingContentItemText'>{parsed.content}</p>
                    </li>
                );
            })}
        </ul>
    );
};
