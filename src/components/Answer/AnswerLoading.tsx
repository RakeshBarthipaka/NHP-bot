import { Stack } from "@fluentui/react";
import { animated, useSpring } from "@react-spring/web";
import styles from "./Answer.module.css";
import LogoWhiteTransparent from "../../assets/CGLense_app_logo_v3.png";


export const AnswerLoading = (props:any) => {

    const animatedStyles = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    return (
        <animated.div style={{ ...animatedStyles }} className={` ${styles.answerContainerDiv}`}>
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                <img src={props.projectData?props.projectData.projectLogoPath:LogoWhiteTransparent} width="100%" height={props.projectData?props.projectData.projectLogoHeight:"30px"} />
                </Stack>
            </Stack.Item>
            <Stack className={styles.answerContainer} verticalAlign="space-between">
                <Stack.Item grow>
                    <p className={styles.answerText}>
                        Generating answer
                        <span className={styles.loadingdots} />
                    </p>
                </Stack.Item>
            </Stack>
        </animated.div>
    );
};
