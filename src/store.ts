import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socket } from './socket'; // Importando o WebSocket

interface VotingResult {
  hot: number;
  cold: number;
  good: number;
  bad: number;
}

interface HistoryItem {
  number: number;
  results: VotingResult;
  timestamp: string;
}

interface VotingState {
  history: HistoryItem[];
}

const initialState: VotingState = {
  history: [],
};

const votingSlice = createSlice({
  name: 'voting',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<HistoryItem>) => {
      console.log('📡 Novo histórico recebido via WebSocket:', action.payload);
      state.history = [...state.history, action.payload];
    },
    setHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      console.log('🔄 Sincronizando histórico inicial:', action.payload);
      state.history = action.payload;
    },
    clearHistory: (state) => {
      console.log('🗑️ Histórico limpo');
      state.history = [];
    },
  },
});

export const { addHistory, setHistory, clearHistory } = votingSlice.actions;

const store = configureStore({
  reducer: {
    voting: votingSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// ✅ Ouvindo eventos do WebSocket e atualizando o Redux automaticamente
socket.on('votingState', ({ history }) => {
  store.dispatch(setHistory(history));
});

socket.on('results', (results) => {
  console.log("📊 Atualização de resultados recebida:", results);
});

// Se precisar sincronizar os dados na inicialização:
socket.emit('getState');

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
