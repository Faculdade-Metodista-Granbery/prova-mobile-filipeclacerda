import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Vibration, Dimensions, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Card, Paragraph, Button } from 'react-native-paper';



const windowWidth = Dimensions.get('window').width;

const CardQuote = ({ img, text, duracao, corCard, corContent, corTexto, corLinhaPlay, corLinhaPause, corBotao }) => {

const [playButton, setPlayButton] = useState("play")
const [corLinha, setCorLinha] = useState('#D8848F')

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    cardBackground: corCard,
    contentBackground: corContent,
    text: corTexto,
    corLinhaPlay: corLinhaPlay,
    corLinhaPause: corLinhaPause,
    corBotao: corBotao,
  },
};

const handleButton = () =>{
        if (playButton === "play"){
            toggle()
            setCorLinha('#B25963')
            setPlayButton("pause")
        } else{
            reset()
            setCorLinha('#D8848F')
            setPlayButton("play")
        }
        
    }
    const [seconds, setSeconds] = useState(0);
    const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.cardBackground,
        margin: 10,
        borderRadius: 20,
        flex: 1,
        width: Platform.OS === 'web' ? '50vh' : windowWidth-20,
        overflow: 'hidden'
    },
    content: {
        backgroundColor: theme.colors.contentBackground,
    },
    cover: {
        height: 220,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 50
    },
    paragraph: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 15
    },
    linha: {
        height: 20,
        marginBottom: 15,
        borderRadius: 20
    },
    linhaPause: {
        height: 20,
        marginBottom: 15,
        borderRadius: 20,
    },
    timer: {
       fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        color: theme.colors.text,
    }
});
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();

  },[]);

  React.useEffect(() => {
    reactive.setValue(-width + (width * seconds)/duracao);
  }, [seconds, width]) 

 
  const [isActive, setIsActive] = useState(false);
  const tempo = new Date(seconds * 1000).toISOString().substr(14, 5)
  const ONE_SECOND_IN_MS = 1000;
  const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS
    ];
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if(seconds== duracao){
        Vibration.vibrate(PATTERN)
        reset()
        setSeconds(0);
        setPlayButton("play")
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

    const porcentagem = seconds*100/duracao
    return (
        <PaperProvider theme={theme}>
        <Card style={styles.card}>
            <Card.Cover
                style={styles.cover}
                resizeMode={`cover`}
                source={{ uri: img }} />
            <Card.Content style={styles.content}>
            </Card.Content>
            <Card.Actions>
                <Button 
                style={styles.button}
                icon= {playButton}
                color={theme.colors.corBotao}
                labelStyle={{ fontSize: 100 }}
                onPress={handleButton}
                />
                
            </Card.Actions>
            <Paragraph style={styles.paragraph}>
                {text}
            </Paragraph>
            <Paragraph
             style={styles.timer}>
            {tempo}
            </Paragraph>
            <View 
            onLayout={(e) => {
                  const newWidth = e.nativeEvent.layout.width;

                  setWidth(newWidth)
                }}
            style={[styles.linhaPause, {backgroundColor: theme.colors.corLinhaPlay, overflow: 'hidden' }]}>
                <Animated.View 
               
                style={[styles.linha, {backgroundColor: theme.colors.corLinhaPause, width: "100%", position: 'absolute',left: 0, top: 0, transform: [{translateX: animatedValue,}]}]}>  
                
                </Animated.View>
            </View>
        </Card>
        </PaperProvider>
    )
}

export default CardQuote;