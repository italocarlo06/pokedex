import { View, Text } from "react-native";
import { ProgressBar } from "../ProgressBar";
import styles from "./styles";

interface BaseStateProps {
    title: string;
    value: number;
    color: string
}

export function BaseStat({ title, value, color }: BaseStateProps) {
    return (
        <View style={styles.baseStateContainer}>
            <View style={{ flexDirection: "row", gap: 10, flex: 2 }}>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={
                        {
                            ...styles.statTitle,
                            color: color
                        }
                    }>{title}</Text>
                </View>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={styles.statValue}>{value}</Text>
                </View>
            </View>

            <View style={{ marginLeft: 10 }}>
                <View style={{ width: 200, height: 20 }}>
                    <ProgressBar value={value} color={color} />
                </View>
            </View>

        </View>
    )
}