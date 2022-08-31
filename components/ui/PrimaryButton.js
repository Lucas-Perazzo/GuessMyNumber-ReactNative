import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

/**
 * * Configuracion base componente de boton personalizado
 * * con animacion en Android (Propiedad de Pressable
 * * android_ripple)
 * 
 * ! La configuracion de style aplicada al componente Pressable 
 * ! para generar un estilo dinamico es aplicable en las 2 plataformas.
 */

function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed
                        ? [styles.buttonInnerContainer, styles.pressed]
                        : styles.buttonInnerContainer}
                onPress={onPress}
                android_ripple={{color: Colors.primary600}}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },

    // ! Configuracion para animacion de boton en IOS
    pressed: {
        opacity: 0.75,
    }
});
export default PrimaryButton;