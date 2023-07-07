import { View } from "react-native";
import styles from "./styles";

interface ProgressBarProps {
    color: string;
    value: number;
}
export function ProgressBar({ value, color }: ProgressBarProps) {
    const progressBarValue = (value >= 100) ? 100 : value;

    return (
        <View
            style={{
                borderColor: color,
                ...styles.progressBarContainer
            }}
        >
            <View
                style={{
                    width: progressBarValue * 2,
                    height: "106%",
                    backgroundColor: color,
                    borderRadius: 10,
                }}
            ></View>
        </View>
    );

}