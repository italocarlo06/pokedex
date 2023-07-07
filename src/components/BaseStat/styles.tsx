import { StyleSheet } from "react-native";

const BaseStateStyle = StyleSheet.create({
    baseStateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginVertical: 1,
    },
    statTitle: {
        fontSize: 15,
        textAlign: "right",
    },
    statValue: {
        fontSize: 15,
        color: "black"
    }
})


export default BaseStateStyle;