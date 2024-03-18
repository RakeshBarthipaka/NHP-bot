import "./Example.scss";

interface Props {
    text: string;
    value: string;
    onClick: (value: string) => void;
}

export const Example = ({ text, value, onClick }: Props) => {
    return (
        <div className='example' onClick={() => onClick(value)}>
            <p className='exampleText StartYourConversationGuide'>{text}</p>
        </div>
    );
};