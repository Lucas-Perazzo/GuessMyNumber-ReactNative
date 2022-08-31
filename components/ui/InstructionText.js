import {Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

/**
 * * Este componente permite sumar estilos por props.
 */
function InstructionText({children, style}) {
    return <Text style={[styles.text, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24
    },
});