import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1220', // fondo oscuro elegante
    padding: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#8ab4ff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#101a2b',
    borderWidth: 1,
    borderColor: '#2b3b57',
    color: '#e6edf3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  btnAgregar: {
    backgroundColor: '#00c48c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },

  list: {
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    gap: 12,
  },
  itemPendiente: {
    backgroundColor: '#0f1b31',
    borderColor: '#2e4366',
  },
  itemPagado: {
    backgroundColor: '#0d1627',
    borderColor: '#273754',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitulo: {
    color: '#e6edf3',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemMonto: {
    color: '#8ab4ff',
    fontSize: 14,
    fontWeight: '600',
  },
  textPagado: {
    color: '#9aa7bd',
    textDecorationLine: 'line-through',
  },
  btnPagar: {
    backgroundColor: '#4a8df6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  badgePagado: {
    color: '#00c48c',
    fontWeight: '800',
  },
  btnEliminar: {
    backgroundColor: '#d63031',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  totalBox: {
    marginTop: 8,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#0f1b31',
    borderWidth: 1,
    borderColor: '#2e4366',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#9fb4d8',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#00c48c',
    fontSize: 18,
    fontWeight: '900',
  },
});

export default styles;
