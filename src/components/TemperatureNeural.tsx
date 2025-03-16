import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface TrainingStep {
  input: number;
  output: number;
  expected: number;
  error: number;
  weight: number;
  bias: number;
}

const TemperatureNeural: React.FC = () => {
  const history = useSelector((state: RootState) => state.voting.history);
  const [weight, setWeight] = useState(0.1);
  const [bias, setBias] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);
  const [trainingSteps, setTrainingSteps] = useState<TrainingStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [newTemp, setNewTemp] = useState<number | "">("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [trainingStarted, setTrainingStarted] = useState(false);
  const [finalEquation, setFinalEquation] = useState<string | null>(null);
  const [bestTemperature, setBestTemperature] = useState<number | null>(null);

  // Função para iniciar o treinamento
  const startTraining = () => {
    if (history.length === 0) return;

    setTrainingStarted(true);
    let newWeight = weight;
    let newBias = bias;
    let steps: TrainingStep[] = [];

    history.forEach((entry) => {
      const input = entry.number;
      const expected = entry.results.good > entry.results.bad ? 1 : 0;

      const result = input * newWeight + newBias;
      const output = result >= 0 ? 1 : 0;
      const error = expected - output;

      newWeight = newWeight + learningRate * error * input;
      newBias = newBias + learningRate * error;

      steps.push({ input, output, expected, error, weight: newWeight, bias: newBias });
    });

    setTrainingSteps(steps);
    setCurrentStep(0);

    // Calcula a equação final do modelo
    setFinalEquation(`f(x) = ${newWeight.toFixed(3)} * x + ${newBias.toFixed(3)}`);

    // Determina a melhor temperatura baseada no peso e viés treinados
    const bestTemp = -newBias / newWeight;
    setBestTemperature(bestTemp);
  };

  // Animação: Avança para o próximo passo de aprendizado
  useEffect(() => {
    if (trainingStarted && currentStep >= 0 && currentStep < trainingSteps.length) {
      const step = trainingSteps[currentStep];

      setTimeout(() => {
        setWeight(step.weight);
        setBias(step.bias);
        setCurrentStep((prev) => prev + 1);
      }, 1000);
    }
  }, [currentStep, trainingStarted]);

  // Função para prever uma nova temperatura
  const handlePredict = () => {
    if (newTemp === "") return;
    const result = Number(newTemp) * weight + bias;
    setPrediction(result >= 0 ? "✅ Boa" : "❌ Ruim");
  };

  return (
    <div className="container">
      <h1>🤖 Treinando IA para Temperaturas</h1>
      <a href="/#/step-2">Voltar</a>

      {/* Lista de temperaturas antes do treino */}
      <div className="history">
        <h2>📊 Dados Coletados</h2>
        {history.length === 0 ? (
          <p>❌ Nenhum dado no histórico ainda.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} className="result">
              <p>🌡️ Temperatura: {item.number}°C</p>
              <p>🔥 Quente: {item.results.hot} | ❄️ Frio: {item.results.cold}</p>
              <p>👍 Bom: {item.results.good} | 👎 Ruim: {item.results.bad}</p>
            </div>
          ))
        )}
      </div>

      {/* Botão para iniciar o treinamento */}
      {!trainingStarted && history.length > 0 && (
        <button onClick={startTraining}>🚀 Iniciar Treinamento</button>
      )}

      {/* Animação do aprendizado */}
      {trainingStarted && currentStep < trainingSteps.length && (
        <div className="training">
          <h2>📚 Passo {currentStep + 1} de {trainingSteps.length}</h2>
          <p>🌡️ Temperatura: {trainingSteps[currentStep]?.input}°C</p>
          <p>🎯 Esperado: {trainingSteps[currentStep]?.expected === 1 ? "✅ Boa" : "❌ Ruim"}</p>
          <p>🔮 Obtido: {trainingSteps[currentStep]?.output === 1 ? "✅ Boa" : "❌ Ruim"}</p>
          <p>⚖️ Peso Atual: {weight.toFixed(3)}</p>
          <p>⚖️ Viés Atual: {bias.toFixed(3)}</p>
          <p>❗ Erro: {trainingSteps[currentStep]?.error}</p>
        </div>
      )}

      {/* Treinamento concluído */}
      {trainingStarted && currentStep >= trainingSteps.length && (
        <>
          <h2>🎉 Treinamento Concluído!</h2>
          <p>📌 Equação do Modelo Treinado:</p>
          <p>{finalEquation}</p>

          {bestTemperature !== null && (
            <p>⭐ Temperatura ótima sugerida: {bestTemperature.toFixed(2)}°C</p>
          )}
        </>
      )}

      {/* Teste de uma nova temperatura após o treino */}
      {trainingStarted && currentStep >= trainingSteps.length && (
        <div className="prediction">
          <h2>📊 Testar uma Nova Temperatura</h2>
          <input type="number" value={newTemp} onChange={(e) => setNewTemp(e.target.value === "" ? "" : Number(e.target.value))} />
          <button onClick={handlePredict}>Prever</button>
          {prediction !== null && <p>🔮 Previsão: {prediction}</p>}
        </div>
      )}
    </div>
  );
};

export default TemperatureNeural;
