import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(c => c + 1);
  const decrement = () => setCounter(c => c - 1);

  const handleInputChange = (text) => {
    if (text.trim() === '') {
      setCounter(0);
      return;
    }
    const n = parseInt(text, 10);
    setCounter(Number.isNaN(n) ? 0 : n);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Mi primer contador</Text>

      <Text style={styles.counter}>Contador: {counter}</Text>

      <TextInput
        placeholder="Ingresa un número"
        keyboardType="numeric"
        value={String(counter)}
        onChangeText={handleInputChange}
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.btnIncrement]} onPress={increment}>
          <Text style={styles.buttonText}>➕ Incrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnDecrement]} onPress={decrement}>
          <Text style={styles.buttonText}>➖ Decrementar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counter: {
    fontSize: 22,
    marginBottom: 15,
    color: '#444',
  },
  input: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
  },
  btnIncrement: {
    backgroundColor: '#34C759', // Verde
  },
  btnDecrement: {
    backgroundColor: '#FF3B30', // Rojo
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
