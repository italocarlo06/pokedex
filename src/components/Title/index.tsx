import { Text } from "react-native";
import styles from "./styles";
interface TitleProps {
  titleColor: string;
  titleText: string;
}
export function Title({titleColor, titleText}: TitleProps) {
  return (
    <Text style={{
      color: titleColor,
      ...styles.title
    }}>
      {titleText}
    </Text>
  )
}