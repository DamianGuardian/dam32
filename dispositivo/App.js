import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  SafeAreaView,View,Text,FlatList,ActivityIndicator,RefreshControl,TouchableOpacity,StatusBar,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana&vs_currencies=usd&include_24hr_change=true";

const CACHE_KEY = "cache:crypto:coingecko:v1";

const COINS_META = {
  bitcoin: { label: "Bitcoin", ticker: "BTC" },
  ethereum: { label: "Ethereum", ticker: "ETH" },
  dogecoin: { label: "Dogecoin", ticker: "DOGE" },
  solana: { label: "Solana", ticker: "SOL" },
};

function fmtUSD(n) {
  if (n == null || Number.isNaN(n)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 6,
    }).format(n);
  } catch {
    return `$${n}`;
  }
}

function fmtPct(n) {
  if (n == null || Number.isNaN(n)) return "—";
  const fixed = Math.abs(n) < 1 ? n.toFixed(2) : n.toFixed(2);
  return `${fixed}%`;
}

export default function App() {
  const [data, setData] = useState(null); 
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const items = useMemo(() => data?.items ?? [], [data]);

  
  const loadCache = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...parsed, source: "cache" });
      }
    } catch {
     
    } finally {
      setLoadingInitial(false);
    }
  }, []);

  
  const fetchNetwork = useCallback(async () => {
    setUpdating(true);
    setError(null);

    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), 10000); 

    try {
      const res = await fetch(API_URL, { signal: ctrl.signal });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();

      
      const now = Date.now();
      const normalized = Object.entries(json).map(([key, v]) => ({
        id: key,
        name: COINS_META[key]?.label ?? key,
        ticker: COINS_META[key]?.ticker ?? key.slice(0, 4).toUpperCase(),
        price: v.usd,
        change24h: v.usd_24h_change,
      }));

      const payload = { items: normalized, updatedAt: now };
      
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));

      setData({ ...payload, source: "network" });
      setOffline(false);
    } catch (e) {
      setError(e?.message ?? "Error de red");
      
      setOffline(true);
    } finally {
      clearTimeout(id);
      setUpdating(false);
    }
  }, []);

  
  useEffect(() => {
    (async () => {
      await loadCache();
      
      fetchNetwork();
    })();
  }, [loadCache, fetchNetwork]);

  const onRefresh = useCallback(async () => {
    await fetchNetwork();
  }, [fetchNetwork]);

  const renderItem = ({ item }) => {
    const up = item.change24h >= 0;
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.coinLeft}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>{item.ticker}</Text>
            </View>
            <Text style={styles.coinName}>{item.name}</Text>
          </View>
          <Text style={styles.price}>{fmtUSD(item.price)}</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={up ? styles.changePositive : styles.changeNegative}>
            {up ? "▲" : "▼"} {fmtPct(item.change24h)}
          </Text>
        </View>
      </View>
    );
  };

  const updatedLabel = useMemo(() => {
    if (!data?.updatedAt) return "—";
    const d = new Date(data.updatedAt);
    return d.toLocaleString();
  }, [data]);

  const empty = !loadingInitial && (!items || items.length === 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerRow}>
        <Text style={styles.title}>Crypto precios (USD)</Text>
        <Text style={styles.subtitle}>
          Última actualización: {updatedLabel}
        </Text>
        <View style={styles.statusPillWrap}>
          {data?.source && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                Fuente: {data.source === "cache" ? "Caché local" : "Red"}
              </Text>
            </View>
          )}
          {updating && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>Actualizando…</Text>
            </View>
          )}
          {offline && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>Modo sin conexión</Text>
            </View>
          )}
        </View>
      </View>

      {loadingInitial ? (
        <ActivityIndicator size="large" />
      ) : empty ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            No hay datos aún. Desliza para refrescar.
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={onRefresh}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {error && (
            <>
              <Text style={styles.footerMsg}>
                Error al actualizar: {error}. Mostrando datos guardados.
              </Text>
              <TouchableOpacity style={styles.retryBtn} onPress={onRefresh}>
                <Text style={styles.retryText}>Reintentar</Text>
              </TouchableOpacity>
            </>
          )}

          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={updating} onRefresh={onRefresh} />
            }
            ListFooterComponent={
              <Text style={styles.footerMsg}>
                Origen: api.coingecko.com · Desliza para actualizar
              </Text>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}
