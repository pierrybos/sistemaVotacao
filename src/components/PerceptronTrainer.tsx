"use client";
import React, { useState } from "react";

const PerceptronTrainer: React.FC = () => {
    const [peso, setPeso] = useState(0.5);
    const [vies, setVies] = useState(-2);
    const [learningRate, setLearningRate] = useState(0.1);
    const [trainingData, setTrainingData] = useState<{ input: number; expected: number }[]>([]);
    const [step, setStep] = useState(0);
    const [history, setHistory] = useState<
        { input: number; output: number; expected: number; error: number; newPeso: number; newVies: number }[]
    >([]);
    const [newInput, setNewInput] = useState<number | "">("");
    const [newExpected, setNewExpected] = useState<number>(0);

    const trainStep = () => {
        if (trainingData.length === 0 || step >= trainingData.length) return;

        const { input, expected } = trainingData[step];
        const result = input * peso + vies;
        const output = result >= 0 ? 1 : 0;
        const error = expected - output;

        const newPeso = peso + error * input * learningRate;
        const newVies = vies + error * learningRate;

        setHistory((prev) => [...prev, { input, output, expected, error, newPeso, newVies }]);
        setPeso(newPeso);
        setVies(newVies);
        setStep((prev) => prev + 1);
    };

    const addTrainingExample = () => {
        if (newInput !== "" && (newExpected === 0 || newExpected === 1)) {
            setTrainingData((prev) => [...prev, { input: Number(newInput), expected: newExpected }]);
            setNewInput("");
        }
    };

    return (
        <div className="container">
            <h1>🧠 Treinando um Perceptron</h1>

            {/* Configurações iniciais */}
            <div className="settings">
                <label>Peso Inicial:
                    <input type="number" value={peso} onChange={(e) => setPeso(parseFloat(e.target.value))} />
                </label>
                <label>Viés Inicial:
                    <input type="number" value={vies} onChange={(e) => setVies(parseFloat(e.target.value))} />
                </label>
                <label>Taxa de Aprendizado:
                    <input type="number" value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))} step="0.01" />
                </label>
            </div>

            {/* Adicionar exemplos de treino */}
            <div className="add-training">
                <h3>Adicionar Exemplo de Treinamento</h3>
                <label>Entrada:
                    <input type="number" value={newInput} onChange={(e) => setNewInput(e.target.value === "" ? "" : parseFloat(e.target.value))} />
                </label>
                <label>Saída Esperada:
                    <select value={newExpected} onChange={(e) => setNewExpected(parseInt(e.target.value))}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                    </select>
                </label>
                <button onClick={addTrainingExample}>Adicionar</button>
            </div>

            {/* Exibição dos cálculos */}
            <div className="status">
                <h2>Passo {step + 1} / {trainingData.length}</h2>
                <p><strong>Peso Atual:</strong> {peso.toFixed(2)}</p>
                <p><strong>Viés Atual:</strong> {vies.toFixed(2)}</p>
            </div>

            {/* Histórico de aprendizado */}
            <div className="history">
                <h3>📜 Histórico de Aprendizado</h3>
                {history.map((item, index) => (
                    <div key={index} className={`result ${item.error === 0 ? "correct" : "error"}`}>
                        <p>🔢 Entrada: {item.input}</p>
                        <p>🎯 Esperado: {item.expected} | 🔮 Obtido: {item.output}</p>
                        <p>⚖️ Cálculo: ({item.input} × {peso.toFixed(2)}) + {vies.toFixed(2)} = <strong>{(item.input * peso + vies).toFixed(2)}</strong></p>
                        <p>❗ Erro: {item.error}</p>
                        <p>🆕 Novo Peso: {item.newPeso.toFixed(2)} | 🆕 Novo Viés: {item.newVies.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Botão para avançar */}
            <button onClick={trainStep} disabled={trainingData.length === 0 || step >= trainingData.length}>
                {trainingData.length === 0 ? "Adicione exemplos para treinar" : step >= trainingData.length ? "Treinamento Concluído" : "Executar Próximo Passo"}
            </button>

            {/* Conclusão */}
            {step >= trainingData.length && trainingData.length > 0 && <p className="success">🎉 O Perceptron aprendeu corretamente!</p>}
        </div>
    );
};

export default PerceptronTrainer;
