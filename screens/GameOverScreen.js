import React from 'react';
import {View,Image,StyleSheet,Text,Button, Dimensions, ScrollView} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';

const GameOverScreen = props => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The game is over!</TitleText>
      <View style={styles.imageContainer}>
      <Image source={require('../assets/success.png')}
      //  source={{uri: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2018/05/matterhorn-3x2.jpg'}}
       style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
      </View>
      <MainButton title='New game' onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultText:{
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60
  },
  imageContainer:{
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  highlight:{
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  image:{
    width: '100%',
    height: '100%'
  }
})

export default GameOverScreen