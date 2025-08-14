import { Text, View, Image } from 'react-native';
import styles from './styles/styles';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}> Bibliografia</Text>
      </View>
      <View style={styles.boxImage}>
        <Image 
          source={require('./assets/foto.png')} 
          style={styles.image} 
        />
        <Text style={styles.text}>Hola, soy Damian Elias y esta es mi bibliografia naci el 31 de octubre del 2002 tengo 22 años y naci en el estado de mexico me gustan los perros y mi cimida favorita son las chimichangas y los fines de semana me gusta jugar videojuegos.</Text>
      </View>
    </View>
  );
};

export default App;
