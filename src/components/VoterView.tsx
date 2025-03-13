import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import { Thermometer as ThermometerHot, Thermometer as ThermometerCold, ThumbsUp, ThumbsDown } from 'lucide-react';

const VoterView = () => {
  const [votingEnabled, setVotingEnabled] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<'hot' | 'cold' | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<'good' | 'bad' | null>(null);

  useEffect(() => {
    socket.on('votingState', ({ enabled }) => {
      setVotingEnabled(enabled);
      if (!enabled) {
        setHasVoted(false);
        setSelectedTemp(null);
        setSelectedQuality(null);
      }
    });

    return () => {
      socket.off('votingState');
    };
  }, []);

  const submitVote = () => {
    if (selectedTemp && selectedQuality && !hasVoted && votingEnabled) {
      socket.emit('vote', {
        temperature: selectedTemp,
        quality: selectedQuality
      });
      setHasVoted(true);
    }
  };

  if (!votingEnabled) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Sistema está encerrado</h2>
          <p className="text-gray-600">Aguarde uma nova temperatura.</p>
        </div>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Obrigado pelo seu voto!</h2>
          <p className="text-gray-600">Esperando a próxima rodada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Ajude a escolher</h1>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Temperatura</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedTemp('hot')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTemp === 'hot'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-200'
                }`}
              >
                <ThermometerHot className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="block text-center">Quente</span>
              </button>
              <button
                onClick={() => setSelectedTemp('cold')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTemp === 'cold'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <ThermometerCold className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <span className="block text-center">Frio</span>
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Qualidade</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedQuality('good')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedQuality === 'good'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-200'
                }`}
              >
                <ThumbsUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <span className="block text-center">Boa</span>
              </button>
              <button
                onClick={() => setSelectedQuality('bad')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedQuality === 'bad'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-200'
                }`}
              >
                <ThumbsDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="block text-center">Ruim</span>
              </button>
            </div>
          </div>

          <button
            onClick={submitVote}
            disabled={!selectedTemp || !selectedQuality}
            className={`w-full py-3 rounded-lg font-semibold ${
              selectedTemp && selectedQuality
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Votar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoterView;