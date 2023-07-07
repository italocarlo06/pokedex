import { StyleSheet } from "react-native";

const MainStatStyles = StyleSheet.create({
  mainStatContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100
  },
  mainStatValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "center",
    height: 32,
  },
  statImage: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  statsText: {
    color: "#1D1D1D",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  statsName: {
    color: "#666666",
    fontSize: 12,
    marginTop: 10
  }
});

export default MainStatStyles;