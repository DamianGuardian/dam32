import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f1a',  // azul oscuro elegante
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#6C5CE7', // morado vibrante
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  boxImage: {
    backgroundColor: '#f058f5ff', // rosa brillante
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#2d3436',
  },
  text: {
    color: '#2d3436',           // gris oscuro sobre fondo claro
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default styles;
