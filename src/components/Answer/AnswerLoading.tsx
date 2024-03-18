import { Stack } from "@fluentui/react";
import { animated, useSpring } from "@react-spring/web";
//import styles from "./Answer.module.css";
import LogoWhiteTransparent from "../../assets/CGLense_app_logo_v3.png";
import CglenseInsightLogo from "../../assets/cglense_icon_logo.png";
import "./Answer.scss";

export const AnswerLoading = (props: any) => {
    const animatedStyles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <animated.div style={{ ...animatedStyles }} className="answerContainerDiv">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between" className="answerLogo">
                    {/* <img src={props.projectData?props.projectData.projectLogoPath:LogoWhiteTransparent} width="100%" height={props.projectData?props.projectData.projectLogoHeight:"30px"} /> */}
                    <img src={CglenseInsightLogo} width="40px" />
                </Stack>
            </Stack.Item>
            <Stack className="answerContainer" verticalAlign="space-between">
                <Stack.Item grow>
                    <p className="answerText">
                        Generating answer
                        <span className="loadingdots" />
                    </p>
                </Stack.Item>
            </Stack>
        </animated.div>
    );
};
