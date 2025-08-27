import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a9eff',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1e2a3a',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4a9eff',
  },
  btnAgregar: {
    marginLeft: 10,
    backgroundColor: '#4a9eff',
    padding: 12,
    borderRadius: 10,
  },
  btnEliminar: {
    marginLeft: 10,
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e2a3a',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#4a9eff',
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
});

export default styles;
