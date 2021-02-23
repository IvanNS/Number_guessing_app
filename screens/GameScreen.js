import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>
      {value}
    </BodyText>
  </View>)

const GameScreen = props => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuessses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver])
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout)

    return () => {Dimensions.removeEventListener('change',updateLayout); };
  });
  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t cheat!', 'Wrong hint', [{ text: 'I won\'t', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1); 
    setPastGuessses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  if (availableDeviceHeight < 500) {
    return (<View style={styles.screen}>
      <Text style>Opponent's Guess</Text>
      <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color='white' /></MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name="md-add" size={24} color='white' /></MainButton>
        </View>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView>
        </View>
    </View>);
  }

  return (
    <View style={styles.screen}>
    <Text style>Opponent's Guess</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style={styles.buttonContainer}>
      <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color='white' /></MainButton>
      <MainButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name="md-add" size={24} color='white' /></MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
    </View>
  </View>);
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  listItem: {
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  listContainer: {
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
    paddingVertical: 10
  }
})

export default GameScreen;