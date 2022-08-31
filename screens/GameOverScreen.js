import { View, Image, StyleSheet, Text, ScrollView, useWindowDimensions } from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    const { width, height } = useWindowDimensions();


    // * Ajusto dinamicamente los valores de alto y ancho de la imagen y el borderRadius segun el el tama;o del dispositivo.

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    };

    if (height < 400) {
        imageSize = 80;
    };

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image
                        source={require('../assets/images/success.png')}
                        style={styles.image} />
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to guess the numer <Text style={styles.highlightText}>{userNumber}</Text>.
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    );
};

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlightText: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});