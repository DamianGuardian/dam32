import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles/styles";

// Formatea "ddmmyyyy" -> "dd/mm/yyyy"
const formatDOB = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8); // solo números, máx 8
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

const isValidDOB = (dob) => {
  //  DD/MM/AAAA
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) return false;

  const [d, m, y] = dob.split("/").map((n) => parseInt(n, 10));
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;

  const daysInMonth = new Date(y, m, 0).getDate(); // último día del mes
  if (d > daysInMonth) return false;

  // Opcional: rango razonable de edades (1900..hoy)
  const now = new Date();
  if (y < 1900 || y > now.getFullYear()) return false;

  return true;
};

export default function App() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState(""); // "DD/MM/AAAA"
  const [password, setPassword] = useState("");

  const onChangeFecha = (text) => {
    setFecha(formatDOB(text));
  };

  const validarRegistro = () => {
    if (!nombre || !correo || !fecha || !password) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
      Alert.alert("Correo inválido", "Ingresa un correo válido.");
      return;
    }

    if (!isValidDOB(fecha)) {
      Alert.alert("Fecha inválida", "Usa el formato DD/MM/AAAA y una fecha real.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña inválida", "Debe tener al menos 6 caracteres.");
      return;
    }

    Alert.alert("Registro exitoso", "Tu cuenta ha sido creada correctamente.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento (DD/MM/AAAA)"
        placeholderTextColor="#aaa"
        value={fecha}
        onChangeText={onChangeFecha}
        keyboardType="number-pad"   
        maxLength={10}              
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.boton} onPress={validarRegistro}>
        <Text style={styles.textoBoton}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
