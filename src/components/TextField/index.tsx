import { StyleProp, TextInput, View, TextStyle, Text, TextInputProps } from "react-native";

interface IProposTextField extends TextInputProps {
    placeHolder?: string
    style?: StyleProp<TextStyle>
}
const TextField: React.FC<IProposTextField> = ({ placeHolder, style, ...rest }) => {

    return (
        <TextInput
            style={style}
            placeholder={placeHolder}
            {...rest}
        />
    )
}

export default TextField