import { Text, StyleSheet, Platform } from 'react-native';

import Colors from '../../constants/colors'

function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: Colors.white,
        textAlign: "center",

        // ? Utilizo la API Platform para cambiar el estilo del componente segun el sistema operativo que lo corra.

        // * Forma 1
        //borderWidth: Platform.OS === 'android' ? 2 : 0,

        // ! Forma 2
        //? Select requiere un objeto como valor predeterminado en el que debemos especificar una propiedad para IOS y otra para Android. 
        borderWidth: Platform.select({ios: 0, android: 2}),

        borderColor: Colors.white,
        padding: 12,
        maxWidth: '80%',
        width: 300
    }
});