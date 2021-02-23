import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelected] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  
  Dimensions.addEventListener('change');
  const numberInputHandler = InputText => {
    setEnteredValue(InputText.replace(/[^0-9]/g, ''));
  };
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelected(chosenNumber);
    Keyboard.dismiss();
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = <Card style={styles.summaryContainer}>
      <Text>You Selected:</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
    </Card>
  }
  return <ScrollView><KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}><TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
  }}>
    <View style={styles.screen}>
      <TitleText style={styles.title}>Start a new game!</TitleText>
      <Card style={styles.inputContainer}>
        <View style={styles.inputContainer}>
          <BodyText style={styles.text}>Select a Number</BodyText>
          <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType='number-pad' maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
          <View style={styles.buttonContainer}>
            <View style={{width: buttonWidth}}><Button title="Reset" color={Colors.accent} onPress={resetInputHandler}></Button></View>
            <View style={{ width: buttonWidth}}><Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}></Button></View>
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  </ScrollView>
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  // button: {
  //   width: Dimensions.get('window').width / 4
  // },
  input: {
    width: 50
  },
  summaryContainer: {
    margin: 20,
    alignItems: 'center',

  },
});

export default StartGameScreen;