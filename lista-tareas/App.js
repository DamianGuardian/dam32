import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles/styles';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [lista, setLista] = useState(new Map()); 

  
  const agregarTarea = () => {
    if (tarea.trim() === '') return;
    const nuevaLista = new Map(lista); 
    nuevaLista.set(Date.now().toString(), tarea);
    setLista(nuevaLista);
    setTarea('');
  };

  
  const eliminarTarea = (id) => {
    const nuevaLista = new Map(lista);
    nuevaLista.delete(id);
    setLista(nuevaLista);
  };

  
  const tareasArray = Array.from(lista, ([id, texto]) => ({ id, texto }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Lista de Tareas con Map</Text>

      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea..."
          placeholderTextColor="#aaa"
          value={tarea}
          onChangeText={setTarea}
        />
        <TouchableOpacity style={styles.btnAgregar} onPress={agregarTarea}>
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={tareasArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.texto}</Text>
            <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarTarea(item.id)}>
              <Text style={styles.btnText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
