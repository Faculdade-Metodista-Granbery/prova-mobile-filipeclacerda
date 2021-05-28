import React, { useState } from 'react';
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

const handleLike = () =>{
        if (playButton === "play"){
            setCorLinha('#B25963')
            setPlayButton("pause")
        } else{
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
        color: theme.colors.text
    },
    linha: {
        borderBottomWidth: 5,
        marginBottom: 5
    }
});
    
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
                onPress={handleLike}
                />
                
            </Card.Actions>
            <Paragraph style={styles.paragraph}>
                {text}
            </Paragraph>
            <View style={[styles.linha, {borderBottomColor: corLinha}]}
            animated={true}
            >
            </View>
        </Card>
        </PaperProvider>
    )
}

export default CardQuote;