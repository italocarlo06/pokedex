import { StyleSheet } from "react-native";

const DetailsStyles = StyleSheet.create({
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 28,
    marginLeft: 10
  },
  pokemonId: {
    fontSize: 20,
    color: "white",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackGround: {
    width: 250,
    height: 250,
    position: "absolute",
    zIndex: -1,
    right: 10,
    top: 20,
  },
  navigationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    zIndex: 1
  },
  pokemonImage: {
    height: 270,
    width: 270,
    zIndex: 1
  },
  pokemonInfoContainer: {
    backgroundColor: "white",
    paddingTop: "17%",
    width: "95%",
    height: "62%",
    borderRadius: 20,
    margin: 10,
    bottom: 80
  },
  typeContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  aboutContainer: {
    marginTop: 20,
  },
  abilitiesContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  baseStatsContainer: {
    marginTop: 20,
  },
  mainStatsContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DetailsStyles;