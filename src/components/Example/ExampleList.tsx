import { Example } from "./Example";
import "./Example.scss";


export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES_CHAT_GPT: ExampleModel[] = [
    {
        text: "Show me some product?",
        value: "Show me some product?"
    },
    {
        text: "What is your customer service page?",
        value: "What is your customer service page?"
    },
    {
        text: "hi , can you help me?",
        value: "hi , can you help me?"
    }
];


const EXAMPLES_FIN_GPT: ExampleModel[] = [
    {
        text: "What was the influence of Cif and sunlight on the performance of Home & Hygiene?",
        value: "What was the influence of Cif and sunlight on the performance of Home & Hygiene?"
    },
    {
        text: "What are the long-term trends and projections for Europe ANZ & MET within the Ice Cream Group?",
        value: "What are the long-term trends and projections for Europe ANZ & MET within the Ice Cream Group?"
    },
    {
        text: "What countries had increases in investments in SEA and how did it go?",
        value: "What countries had increases in investments in SEA and how did it go?"
    }
];


interface Props {
    onExampleClicked: (value: string) => void;
    chatBotTypes: string,
    projectData:any
}

export const ExampleList = ({ onExampleClicked, chatBotTypes, projectData }: Props) => {
    let EXAMPLES = projectData && projectData.exampleListQuestion?projectData.exampleListQuestion: EXAMPLES_CHAT_GPT;
    return (
        <ul className='examplesNavList'>
            {EXAMPLES.map((x:any, i:any) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
