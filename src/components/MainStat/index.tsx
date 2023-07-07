import { Image, ImageSourcePropType, Text, View } from "react-native";
import styles from "./styles";


interface MainStatProps {
  name: string;
  values: string[];
  source?: ImageSourcePropType;
  imgWidth?: number;
  imgHeigth?: number;
}
export function MainStat({ name, values, source, imgHeigth, imgWidth }: MainStatProps) {
  return (
    <View style={styles.mainStatContainer}>
      <View style={styles.mainStatValueContainer}>
        {source && <Image
          source={source}
          style={{ ...styles.statImage, height: imgHeigth, width: imgWidth }}
        />}
        <Text style={styles.statsText} >{values[0]}</Text>
      </View>
      <Text style={styles.statsName}>{name}</Text>
    </View>)
}