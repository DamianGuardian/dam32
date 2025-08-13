import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // negro grisáceo elegante
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#00E5FF', // celeste brillante
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
    textShadowColor: '#00E5FF55',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  box: {
    backgroundColor: '#1F1B2E', // morado muy oscuro
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  boxImage: {
    backgroundColor: '#29293d', // gris azulado oscuro
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
    shadowColor: '#FF00FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#00E5FF',
  },
  text: {
    color: '#E0E0E0', // gris claro
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default styles;
