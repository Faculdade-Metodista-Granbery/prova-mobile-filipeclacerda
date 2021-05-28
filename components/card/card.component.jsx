import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Card, Paragraph, Button } from 'react-native-paper';





const CardQuote = ({ img, text, corCard, corContent, corTexto, corLinhaPlay, corLinhaPause, corBotao }) => {

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
    const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.cardBackground,
        margin: 10,
        borderRadius: 20,
        flex: 1,
        width: '50vh',
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
        borderBottomWidth: 5,
        marginBottom: -5
    },
    linhaPause: {
        borderBottomWidth: 5,
        marginBottom: 20
    }
});
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
    if(seconds== 15){
        reset()
        setSeconds(0);
        setPlayButton("play")
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

    const porcentagem = seconds*100/15
    return (
        <PaperProvider theme={theme}>
        <Card style={styles.card}>
            <Card.Cover
                style={styles.cover}
                resizeMode={`cover`}
                source={{ uri: img }} />
            <Card.Content style={styles.content}>
            {seconds}
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
            <View style={[styles.linhaPause, {borderBottomColor: theme.colors.corLinhaPlay, width: "100%"}]}>
                <View style={[styles.linha, {borderBottomColor: theme.colors.corLinhaPause, width: porcentagem + "%"}]}>  
                </View>
            </View>
        </Card>
        </PaperProvider>
    )
}

export default CardQuote;