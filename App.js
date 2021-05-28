import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar } from 'react-native';
import CardQuote from './components/card/card.component';
import firebase from './services/firebase';
import { useList } from 'react-firebase-hooks/database'



export default function App() {
 const [cards, loading, error] = useList(firebase.getAll())
  cards.map(value => console.log(value.val()))
  return (

    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
       />
      <FlatList
          data={cards}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
          <CardQuote 
            key={item.val().id}
            text={item.val().task}
            img={item.val().background}
            corCard='#F8E7E2'
            corContent='#FAE8E0'
            corTexto='#000000'
            corLinhaPlay='#D8848F'
            corLinhaPause='#B25963'
            corBotao='#541616'
          />
      }
      >
      </FlatList>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});