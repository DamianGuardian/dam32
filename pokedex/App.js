import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import styles from './styles/styles';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pokemonCounter, setPokemonCounter] = useState(0);

  const agregarPokemon = () => {
    if (!nombre.trim() || !tipo.trim() || !imageUrl.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const nuevoPokemon = {
      id: pokemonCounter,
      nombre: nombre.trim(),
      tipo: tipo.trim(),
      imageUrl: imageUrl.trim(),
      atrapado: false
    };

    setPokemonList([...pokemonList, nuevoPokemon]);
    setNombre('');
    setTipo('');
    setImageUrl('');
    setPokemonCounter(pokemonCounter + 1);
  };

  const marcarAtrapado = (pokemonId) => {
    const updatedList = pokemonList.map(pokemon => 
      pokemon.id === pokemonId 
        ? { ...pokemon, atrapado: !pokemon.atrapado }
        : pokemon
    );
    setPokemonList(updatedList);
  };

  const totalAtrapados = pokemonList.filter(pokemon => pokemon.atrapado).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      
      <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre del Pokemon</Text>
            <TextInput
              placeholder="Ej. Pikachu"
              placeholderTextColor="#7fb069"
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tipo del Pokemon</Text>
            <TextInput
              placeholder="Ej. Eléctrico"
              placeholderTextColor="#7fb069"
              value={tipo}
              onChangeText={setTipo}
              style={styles.input}
              maxLength={30}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>URL de la Imagen</Text>
            <TextInput
              placeholder="https://ejemplo.com/imagen.png"
              placeholderTextColor="#7fb069"
              value={imageUrl}
              onChangeText={setImageUrl}
              style={styles.input}
              keyboardType="url"
            />
          </View>

          <TouchableOpacity 
            style={styles.addButton} 
            onPress={agregarPokemon}
          >
            <Text style={styles.addButtonText}> Agregar Pokémon</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Registrados</Text>
            <Text style={styles.statValue}>{pokemonList.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Atrapados</Text>
            <Text style={styles.statValueCaught}>{totalAtrapados}</Text>
          </View>
        </View>

        {pokemonList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyMessage}>No hay Pokémon registrados</Text>
            <Text style={styles.emptySubMessage}>¡Agrega tu primer Pokémon a la Pokédex!</Text>
          </View>
        ) : (
          pokemonList.map((pokemon) => (
            <View key={pokemon.id} style={[
              styles.pokemonCard,
              pokemon.atrapado && styles.pokemonCardCaught
            ]}>
              <View style={styles.pokemonImageContainer}>
                <Image 
                  source={{ uri: pokemon.imageUrl }}
                  style={styles.pokemonImage}
                  resizeMode="contain"
                  onError={() => {
                    console.log('Error cargando imagen para:', pokemon.nombre);
                  }}
                />
              </View>
              
              <View style={styles.pokemonInfo}>
                <Text style={[
                  styles.pokemonName,
                  pokemon.atrapado && styles.pokemonNameCaught
                ]}>
                  {pokemon.nombre}
                </Text>
                <Text style={[
                  styles.pokemonType,
                  pokemon.atrapado && styles.pokemonTypeCaught
                ]}>
                  Tipo: {pokemon.tipo}
                </Text>
                
                <TouchableOpacity 
                  style={[
                    styles.catchButton,
                    pokemon.atrapado ? styles.catchButtonCaught : styles.catchButtonActive
                  ]}
                  onPress={() => marcarAtrapado(pokemon.id)}
                >
                  <Text style={styles.catchButtonText}>
                    {pokemon.atrapado ? 'Atrapado' : 'Atrapar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}