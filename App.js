import { Text, View, Image } from 'react-native';
import styles from './styles/styles';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Hola mundo</Text>
      </View>
      <View style={styles.boxImage}>
        <Image 
          source={require('./assets/perrito.png')} 
          style={styles.image} 
        />
        <Text style={styles.text}>Hola, soy Damian Elias y esta es mi primera app en React Native.</Text>
      </View>
    </View>
  );
};

export default App;
