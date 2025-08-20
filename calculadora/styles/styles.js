import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419', 
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 40,
    paddingHorizontal: 20, 
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a9eff', 
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: '#1e2a3a',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  inputsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },

  inputContainer: {
    backgroundColor: '#1e2a3a', 
    padding: 15,
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#4a9eff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#2d5aa0',
    width: '90%',
  },

  inputLabel: {
    color: '#b8d4f0',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  input: {
    backgroundColor: '#2d3748', 
    borderWidth: 2,
    borderColor: '#4a9eff',
    borderRadius: 12,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: 'center',
    color: '#b8d4f0', 
    fontWeight: 'bold',
  },

  resultContainer: {
    backgroundColor: '#1e2a3a',
    borderRadius: 20,
    padding: 25,
    elevation: 12,
    shadowColor: '#4a9eff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    borderWidth: 3,
    borderColor: '#2d5aa0',
    minWidth: '85%',
    alignItems: 'center',
  },

  operationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7a9cc6',
    marginBottom: 10,
    textAlign: 'center',
  },

  resultText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4a9eff',
    textShadowColor: '#1e2a3a',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 5,
    gap: 10,
  },

  button: {
    backgroundColor: '#2d5aa0', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#4a9eff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#4a9eff',
    flex: 0.48,
    minHeight: 55,
    justifyContent: 'center',
  },

  buttonSuma: {
    backgroundColor: '#28a745', 
    borderColor: '#34ce57',
  },

  buttonResta: {
    backgroundColor: '#dc3545', 
    borderColor: '#e74c3c', 
  },

  buttonMultiplicacion: {
    backgroundColor: '#fd7e14', 
    borderColor: '#ff8c00', 
  },

  buttonDivision: {
    backgroundColor: '#6f42c1', 
    borderColor: '#8a63d2', 
  },

  buttonClear: {
    backgroundColor: '#1e2a3a', 
    borderColor: '#7a9cc6',
    width: '90%',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default styles;