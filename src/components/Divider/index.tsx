import { Image } from "react-native";

export function Divider(){
  return (
    <Image
      source={require("../../../assets/divider.png")}
      style={{ height: 30, width: 3, marginHorizontal: 25 }}
    />
  )
}