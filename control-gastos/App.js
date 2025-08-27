import React, { useMemo, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/styles';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [monto, setMonto] = useState('');
  const [gastos, setGastos] = useState([]); 

  
  const soloNumeros = (txt) => {
    const limpio = txt.replace(/[^0-9.]/g, '');
    const normalizado = limpio.split('.').slice(0, 2).join('.');
    setMonto(normalizado);
  };

  const agregarGasto = () => {
    const valor = parseFloat(monto);
    if (!titulo.trim() || !isFinite(valor)) return;

    const nuevo = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      monto: Math.round(valor * 100) / 100,
      pagado: false,
    };
    setGastos((prev) => [nuevo, ...prev]);
    setTitulo('');
    setMonto('');
  };

  const pagarGasto = (id) => {
    setGastos((prev) =>
      prev.map((g) => (g.id === id ? { ...g, pagado: true } : g))
    );
  };

  const eliminarGasto = (id) => {
    setGastos((prev) => prev.filter((g) => g.id !== id));
  };

  
  const totalPendiente = useMemo(
    () => gastos.filter((g) => !g.pagado).reduce((acc, g) => acc + g.monto, 0),
    [gastos]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Control de Gastos</Text>

      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Título del gasto (Ej. Café Starbucks)"
          placeholderTextColor="#98a2b3"
          value={titulo}
          onChangeText={setTitulo}
          returnKeyType="next"
        />
      </View>

      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Monto (solo números)"
          placeholderTextColor="#98a2b3"
          value={monto}
          keyboardType="numeric"
          onChangeText={soloNumeros}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.btnAgregar} onPress={agregarGasto}>
          <Text style={styles.btnText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      
      <ScrollView style={styles.list}>
        {gastos.map((g) => (
          <View
            key={g.id}
            style={[
              styles.item,
              g.pagado ? styles.itemPagado : styles.itemPendiente,
            ]}
          >
            <View style={styles.itemInfo}>
              <Text
                style={[styles.itemTitulo, g.pagado && styles.textPagado]}
                numberOfLines={1}
              >
                {g.titulo}
              </Text>
              <Text style={[styles.itemMonto, g.pagado && styles.textPagado]}>
                ${g.monto.toFixed(2)}
              </Text>
            </View>

            {!g.pagado ? (
              <TouchableOpacity style={styles.btnPagar} onPress={() => pagarGasto(g.id)}>
                <Text style={styles.btnText}>Pagar</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.badgePagado}>Pagado</Text>
                <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarGasto(g.id)}>
                  <Text style={styles.btnText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total pendiente:</Text>
          <Text style={styles.totalValue}>${totalPendiente.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
