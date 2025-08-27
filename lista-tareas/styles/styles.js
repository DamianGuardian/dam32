import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa', // Fondo claro
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c5ce7', // Morado
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
    backgroundColor: '#ffffff',
    color: '#2d3436',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6c5ce7', 
  },
  btnAgregar: {
    marginLeft: 10,
    backgroundColor: '#00b894', 
    padding: 12,
    borderRadius: 10,
  },
  btnEliminar: {
    marginLeft: 10,
    backgroundColor: '#d63031', 
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#dfe6e9', 
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#00b894', 
  },
  taskText: {
    color: '#2d3436',
    fontSize: 16,
    flex: 1,
  },
});

export default styles;
