import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b4332', 
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#40916c', 
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: '#081c15',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  mainScrollView: {
    flex: 1,
  },

  formContainer: {
    backgroundColor: '#2d5a41', 
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#40916c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 3,
    borderColor: '#52b788', 
  },

  inputContainer: {
    marginBottom: 15,
  },

  inputLabel: {
    color: '#b7e4c7', 
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  input: {
    backgroundColor: '#40916c', 
    borderWidth: 2,
    borderColor: '#52b788',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#f1faee', 
    fontWeight: '500',
  },

  addButton: {
    backgroundColor: '#52b788', 
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#40916c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#74c69d',
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
  },

  statBox: {
    backgroundColor: '#2d5a41',
    borderRadius: 15,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#40916c',
    elevation: 5,
  },

  statLabel: {
    color: '#b7e4c7',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
    letterSpacing: 0.5,
  },

  statValue: {
    color: '#52b788',
    fontSize: 24,
    fontWeight: 'bold',
  },

  statValueCaught: {
    color: '#74c69d', 
    fontSize: 24,
    fontWeight: 'bold',
  },

  pokemonContainer: {
  },

  pokemonCard: {
    backgroundColor: '#2d5a41',
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    borderWidth: 3,
    borderColor: '#40916c',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#52b788',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  pokemonCardCaught: {
    backgroundColor: '#1b4332', 
    borderColor: '#74c69d',
    opacity: 0.9,
  },

  pokemonImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#52b788',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#74c69d',
    marginRight: 15,
  },

  pokemonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  pokemonInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  pokemonName: {
    color: '#f1faee',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'capitalize',
  },

  pokemonNameCaught: {
    color: '#b7e4c7',
    textDecorationLine: 'line-through',
  },

  pokemonType: {
    color: '#b7e4c7',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    fontStyle: 'italic',
  },

  pokemonTypeCaught: {
    color: '#7fb069',
    textDecorationLine: 'line-through',
  },

  catchButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    elevation: 3,
  },

  catchButtonActive: {
    backgroundColor: '#52b788',
    borderColor: '#74c69d',
  },

  catchButtonCaught: {
    backgroundColor: '#2d5a41',
    borderColor: '#7fb069',
  },

  catchButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },

  emptyMessage: {
    color: '#52b788',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },

  emptySubMessage: {
    color: '#7fb069',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default styles;