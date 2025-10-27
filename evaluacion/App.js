
import React, { useState, useCallback } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";


import PostsListScreen from "./screens/PostsListScreen";
import PostDetailScreen from "./screens/PostDetailScreen";
import PostEditScreen from "./screens/PostEditScreen";

export default function App() {

  const [route, setRoute] = useState({
    name: "list",
    params: null
  });


  const goList = useCallback(() => {
    setRoute({ name: "list", params: null });
  }, []);

  
  const openDetail = useCallback((postId) => {
    setRoute({
      name: "detail",
      params: { postId }
    });
  }, []);

  const openEditor = useCallback(({ mode, postId = null }) => {
    setRoute({
      name: "edit",
      params: { mode, postId }
    });
  }, []);


  const goBack = useCallback(() => {

    setRoute({ name: "list", params: null });
  }, []);

  const navigation = {
    navigate: (screenName, params) => {
   

      if (screenName === "list") {
        goList();
      } else if (screenName === "detail") {
     
        openDetail(params?.postId);
      } else if (screenName === "edit") {
  
        openEditor({
          mode: params?.mode || "create",
          postId: params?.postId || null
        });
      } else {
    
        goList();
      }
    },

    goBack: goBack,
  };
  let ScreenComponent = null;
  let screenProps = {};

  if (route.name === "list") {
    ScreenComponent = PostsListScreen;
    screenProps = {
      navigation

    };
  } else if (route.name === "detail") {
    ScreenComponent = PostDetailScreen;
    screenProps = {
      navigation,
      route: {
        params: {
          postId: route.params?.postId
        }
      }
    };
  } else if (route.name === "edit") {
    ScreenComponent = PostEditScreen;
    screenProps = {
      navigation,
      route: {
        params: {
          mode: route.params?.mode || "create",
          postId: route.params?.postId || null
        }
      }
    };
  } else {
  
    ScreenComponent = PostsListScreen;
    screenProps = { navigation };
  }

 
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeRoot}>
        <ScreenComponent {...screenProps} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeRoot: {
    flex: 1,
    backgroundColor: "#0F172A" 
  }
});
