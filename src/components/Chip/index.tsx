import { Text, View } from "react-native"
import styles from "./style"

interface ChipProps {
  name: string;
  color: string;
}

export function Chip({ name, color }: ChipProps) {
  return (
    <View >
      <Text style={
        {
          backgroundColor: color,
          overflow: 'hidden',
          ...styles.chipContainer,
        }
      }>{name}</Text>
    </View>
  )
}