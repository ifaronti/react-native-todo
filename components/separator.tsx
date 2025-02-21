import { useColorScheme, View } from "react-native";

export default function Separator() {
    const colorScheme = useColorScheme()
    
    return (
        <View
            style={
                {
                    backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
                    width: '100%', height: 0.3
                }
            }
        />
    )
}