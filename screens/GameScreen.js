import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

/**
 * ? Releer como pasan por prop parametros de estado a otros componentes. 
 * ? Por ejemplo en la cantidad de rondas jugadas.
 * * Funcion de utilidad que genera un numero aleatorio entre
 * * un numero minimo y maximo definido en los 2 primeros parametros.
 * * El 3er argumento nos permite excluir un numero,
 * * en la constante "rndNum".
 */

function generateRandomBetweeen(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetweeen(min, max, exclude);
    } else {
        return rndNum;
    };
};

/**
 * * Variables auxiliares para los parametros de la funcion
 * * generateRandomBetweeen();
 */

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetweeen(
        1,
        100,
        userNumber
    );
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();
    /**
     * !Las dependencias que se colocan en el useEffect seran las que haran que se vuelva a recargar el componente por lo tanto analizara nuevamente la validacion y ejecutara la funcion onGameOver(); si se cumple.
     */
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) { // direction => 'lower', 'greater'
        /**
         * !Validacion donde evitamos un loop infinito cuando el rango entre numeros llega a 0 si elegimos un numero mas bajo cuando debemos elegir uno mas alto. Avisamos al usuario con un Alert que el numero elegido es mayor o menor y no puede accionar en la direccion seleccionada.
         */
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        };
        if (direction === 'lower') {
            /**
             * ! Al tener que utilizar esta direccion sabemos que 
             * ! el nuevo limite maximo para nuestro numero sera la 
             * ! estimacion actual porque sabemos que esta era demasiado 
             * ! alta. Por lo tanto cambiamos nuestro valor de  maxBoundary.
             */
            maxBoundary = currentGuess;
        } else {
            /**
             * !Para no obtener el mismo valor minimo si tenemos que utilizar esta direccion que representa generar un numero mas alto debemos cambiar nuestro valor de minBoundary a la estimacion actual + 1 de esta manera excluimos ese valor del proximo que se genera.
             */
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetweeen(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    };

    const guessRoudsListLength = guessRounds.length;

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.intrtuctionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) =>
                        <GuessLogItem roundNumber={guessRoudsListLength - itemData.index}
                            guess={itemData.item} />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    intrtuctionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});