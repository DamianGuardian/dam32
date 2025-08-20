import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import React, { useState } from 'react';

export default function App() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(0);
  const [operacionActual, setOperacionActual] = useState('');

  const handleInputChange = (value, setInput) => {
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setInput(value);
    }
  };

  const realizarOperacion = (operacion) => {
    const num1 = parseFloat(numero1) || 0;
    const num2 = parseFloat(numero2) || 0;
    let result = 0;

    setOperacionActual(operacion);

    switch (operacion) {
      case 'suma':
        result = num1 + num2;
        break;
      case 'resta':
        result = num1 - num2;
        break;
      case 'multiplicacion':
        result = num1 * num2;
        break;
      case 'division':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setResultado('Error: División por cero');
          return;
        }
        break;
      default:
        result = 0;
    }

    setResultado(Math.round(result * 1000000) / 1000000);
  };

  const limpiarCalculadora = () => {
    setNumero1('');
    setNumero2('');
    setResultado(0);
    setOperacionActual('');
  };

  const obtenerSimboloOperacion = () => {
    switch (operacionActual) {
      case 'suma': return '+';
      case 'resta': return '-';
      case 'multiplicacion': return '×';
      case 'division': return '÷';
      default: return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora Avanzada</Text>
      
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Primer Número</Text>
          <TextInput
            placeholder="Ingrese el primer número"
            placeholderTextColor="#7a9cc6"
            keyboardType="numeric"
            value={numero1}
            onChangeText={(value) => handleInputChange(value, setNumero1)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Segundo Número</Text>
          <TextInput
            placeholder="Ingrese el segundo número"
            placeholderTextColor="#7a9cc6"
            keyboardType="numeric"
            value={numero2}
            onChangeText={(value) => handleInputChange(value, setNumero2)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.operationText}>
          {numero1 || '0'} {obtenerSimboloOperacion()} {numero2 || '0'} =
        </Text>
        <Text style={styles.resultText}>{resultado}</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonSuma]} 
          onPress={() => realizarOperacion('suma')}
        >
          <Text style={styles.buttonText}>+ Suma</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.buttonResta]} 
          onPress={() => realizarOperacion('resta')}
        >
          <Text style={styles.buttonText}>- Resta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonMultiplicacion]} 
          onPress={() => realizarOperacion('multiplicacion')}
        >
          <Text style={styles.buttonText}>× Multi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.buttonDivision]} 
          onPress={() => realizarOperacion('division')}
        >
          <Text style={styles.buttonText}>÷ Divi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.buttonClear]} 
        onPress={limpiarCalculadora}
      >
        <Text style={styles.buttonText}>🗑 Limpiar</Text>
      </TouchableOpacity>
    </View>
  );
}