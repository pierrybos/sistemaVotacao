import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { socket } from '../socket';
import { Thermometer as ThermometerHot, Thermometer as ThermometerCold, ThumbsUp, ThumbsDown } from 'lucide-react';

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

const PresenterView = () => {
  const [votingEnabled, setVotingEnabled] = useState(false);
  const [results, setResults] = useState<VotingResult>({ hot: 0, cold: 0, good: 0, bad: 0 });
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [inputNumber, setInputNumber] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const voterUrl = `${window.location.origin}/vote`;

  useEffect(() => {
    socket.on('results', (newResults: VotingResult) => {
      setResults(newResults);
    });

    socket.on('votingState', ({ enabled, results: newResults, currentNumber: number, history: newHistory }) => {
      setVotingEnabled(enabled);
      setResults(newResults);
      setCurrentNumber(number);
      setHistory(newHistory);
    });

    socket.emit('getState');

    return () => {
      socket.off('results');
      socket.off('votingState');
    };
  }, []);

  const clearHistory = () => {
    socket.emit('clearHistory');
    setHistory([]);
  };

  const startVoting = () => {
    const number = parseInt(inputNumber);
    if (isNaN(number)) {
      alert('Please enter a valid number');
      return;
    }
    socket.emit('startVoting', { number });
    setInputNumber('');
  };

  const stopVoting = () => {
    socket.emit('stopVoting');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Definindo Ar Condicionado</h1>
          
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <div className={votingEnabled ? 'hidden' : 'block'}>
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="Temperatura"
                    className="px-4 py-2 border rounded-lg w-32"
                  />
                  <button
                    onClick={startVoting}
                    className="px-6 py-2 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white"
                  >
                    Votar
                  </button>
                </div>
              </div>
              
              <div className={!votingEnabled ? 'hidden' : 'block'}>
                <div className="text-2xl font-bold mb-4">
                  Votando em: {currentNumber}º
                </div>
                <button
                  onClick={stopVoting}
                  className="px-6 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white"
                >
                  Encerrar
                </button>
              </div>
              
              <p className="mt-2 text-sm text-gray-600">
                A votação está {votingEnabled ? 'em andamento' : 'encerrada'}
              </p>
            </div>
            
            <div className="w-48">
              <QRCodeSVG value={voterUrl} size={192} />
              <p className="text-center mt-2 text-sm text-gray-600">Qrcode para votar</p>
              <p className="text-center mt-1 text-xs text-gray-500 break-all">{voterUrl}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Temperatura</h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <ThermometerHot className="w-8 h-8 text-red-500 mx-auto" />
                  <p className="text-2xl font-bold mt-2">{results.hot}</p>
                  <p className="text-gray-600">Quente</p>
                </div>
                <div className="text-center">
                  <ThermometerCold className="w-8 h-8 text-blue-500 mx-auto" />
                  <p className="text-2xl font-bold mt-2">{results.cold}</p>
                  <p className="text-gray-600">Frio</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Qualidade</h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <ThumbsUp className="w-8 h-8 text-green-500 mx-auto" />
                  <p className="text-2xl font-bold mt-2">{results.good}</p>
                  <p className="text-gray-600">Bom</p>
                </div>
                <div className="text-center">
                  <ThumbsDown className="w-8 h-8 text-red-500 mx-auto" />
                  <p className="text-2xl font-bold mt-2">{results.bad}</p>
                  <p className="text-gray-600">Ruim</p>
                </div>
              </div>
            </div>
          </div>

          {/* Voting History */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Histório</h2>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Temperatura: {item.number}º</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-around">
                      <div className="text-center">
                        <span className="text-red-500">Quente: {item.results.hot}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-blue-500">Calor: {item.results.cold}</span>
                      </div>
                    </div>
                    <div className="flex justify-around">
                      <div className="text-center">
                        <span className="text-green-500">Bom: {item.results.good}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-red-500">Ruim: {item.results.bad}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <button
                onClick={clearHistory}
                className="px-6 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white"
              >
                Limpar Registros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresenterView;