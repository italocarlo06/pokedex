import { StyleProp, View, TouchableOpacity, TextStyle, Text, Image } from "react-native";
import CardStyle from "../../styles/Card.style";

interface IProposCard {
    code: string;
    name: string;
    url: string;
    style?: StyleProp<TextStyle>;
    color: string;
    onPress: () => void;
}
const Card: React.FC<IProposCard> = ({ code, name, url, color, style, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                ...CardStyle.container,
                borderColor: color,
                borderWidth: 2
            }}>
                <Text style={CardStyle.labelCode}>{code}</Text>

                <View style={CardStyle.imageContainer}>
                    <Image
                        style={CardStyle.image}
                        source={{
                            uri: url
                        }}
                    />
                </View>

                <View style={{
                    ...CardStyle.subContainer,
                    backgroundColor: color
                }}>
                    <Text style={CardStyle.labelName}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default Card