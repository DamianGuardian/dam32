import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

function Item({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Image
        source={{ uri: item.url }}
        style={styles.img}
        resizeMode="cover"
        onLoad={() => console.log("OK:", item.nombre)}
        onError={(e) => console.warn("IMG ERR:", item.nombre, e.nativeEvent)}
      />
    </View>
  );
}

export default function App() {
  const data = [
    { 
      id: 1, 
      nombre: 'Tamales', 
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZRMXNUHuRtt3xEfwEcHEU7uKAhJUU83J15Q&s'
    },
    { 
      id: 2, 
      nombre: 'Pozole', 
      url: 'https://sabrosano.com/wp-content/uploads/2020/05/Pozole_06-1-principal.jpg'
    },
    { 
      id: 3, 
      nombre: 'Sopes', 
      url: 'https://www.goya.com/wp-content/uploads/2023/10/sopes-900x900.jpg'
    },
    { 
      id: 4, 
      nombre: 'Mole', 
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrMAdSH_zUbUQRVAXte7INw-YbNMFH-GuuQ&s'
    },
     { 
      id: 5, 
      nombre: 'Chiles rellenos', 
      url: 'https://www.unileverfoodsolutions.com.mx/tendencias/de-mexico-para-el-mundo/platillos-mexicanos/top10-platillos/jcr:content/parsys/content-aside-footer/columncontrol_copy_1598158461/columnctrl_parsys_2/textimage_copy/image.transform/jpeg-optimized/image.1592429865860.jpg'
    },
        { 
      id: 6, 
      nombre: 'Pambazos', 
      url: 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/793A97EF-5AB6-42BC-B6D7-BA32F58729E8/Derivates/71B61452-6C6C-4FF4-A166-FC7206C9FA05.jpg'
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Este es un ejemplo usando FlatList en React Native
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
});
