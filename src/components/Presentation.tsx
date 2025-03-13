"use client";
import React, { useEffect, useState } from 'react';
import 'impress.js';
import './presentation.css'; // Importando o CSS


const Presentation: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(5); // Tamanho base da fonte

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("impress.js").then(() => {
                const impress = window.impress();
                impress.init();
            });
        }

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => e.stopPropagation());
    });
    }, []);


const updateFontSize = (size: number) => {
    document.documentElement.style.setProperty("--font-size-h1", `${size}em`);
    document.documentElement.style.setProperty("--font-size-h2", `${size * 0.8}em`);
    document.documentElement.style.setProperty("--font-size-h3", `${size * 0.7}em`);
    document.documentElement.style.setProperty("--font-size-h4", `${size * 0.6}em`);
    document.documentElement.style.setProperty("--font-size-h5", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-h6", `${size * 0.4}em`);
    document.documentElement.style.setProperty("--font-size-p", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-span", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-strong", `${size * 0.6}em`);
    document.documentElement.style.setProperty("--font-size-em", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-small", `${size * 0.4}em`);
    document.documentElement.style.setProperty("--font-size-a", `${size * 0.6}em`);
    document.documentElement.style.setProperty("--font-size-ul", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-li", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-blockquote", `${size * 0.7}em`);
    document.documentElement.style.setProperty("--font-size-code", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-pre", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-kbd", `${size * 0.5}em`);
    document.documentElement.style.setProperty("--font-size-sub", `${size * 0.4}em`);
    document.documentElement.style.setProperty("--font-size-sup", `${size * 0.4}em`);
};

const increaseFontSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFontSize((prev) => {
        const newSize = Math.min(prev + 0.5, 8);
        updateFontSize(newSize);
        return newSize;
    });
};

const decreaseFontSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFontSize((prev) => {
        const newSize = Math.max(prev - 0.5, 3);
        updateFontSize(newSize);
        return newSize;
    });
};


const toggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark-mode");
};


    return (
        <>
        <div className="controls">
                <button onClick={toggleDarkMode}>{isDarkMode ? "Modo Claro" : "Modo Escuro"}</button>
                <button onClick={increaseFontSize}>A+</button>
                <button onClick={decreaseFontSize}>A-</button>
            </div>

        <div id="impress">
            {/* Slide 1 - Introdução */}
            <div className="step" data-x="0" data-y="0" data-scale="1">
                <h1>Inteligência Artificial</h1>
                <h2>Ferramenta Genial</h2>
            </div>

            {/* Slide 2 - Pergunta inicial */}
            <div className="step" data-x="1000" data-y="0" data-rotate="10">
                <h2>Quente, não?</h2>
                <p>Definindo a temperatura do ambiente.</p>
                <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} onClick={(e) => e.stopPropagation()} className="text-white color-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href="/votar">Votar</a>
            </div>

                <div className="step" data-x="2000" data-y="0" data-rotate="20" data-scale="1.5">
                    <h2>Vamos começar!</h2>
                </div>

            <div className="step"  data-x="3000" data-y="1000" data-rotate="30">
                <h2>Tópicos</h2>
                <ul>
                    <li>Quem sou?</li>
                    <li>Como nasceu a IA?</li>
                    <li>Como ela funciona?</li>
                    <li>Usando no dia a dia</li>
                    <li>Principais problemas</li>
                </ul>
            </div>



            {/* Slide 4 - Quem sou */}
            <div className="step" data-x="-2000" data-y="1000" data-rotate="30">
                <h3>Quem é Piérry Bos?</h3>
                <h2>Desenvolvedor | Programador no TRF4 | Porto Alegre</h2>
                <p><strong>📍 Localização:</strong> Porto Alegre, RS</p>
                <p><strong>💼 Cargo Atual:</strong> Programador no Tribunal Regional Federal da 4ª Região (TRF4)</p>
                <p><strong>🗓️ Anos de Experiência:</strong> 12 anos (desde 2013)</p>

                <h3>📱 Redes Sociais</h3>
                <p>
                    <a href="https://www.instagram.com/pierrybos/" target="_blank">Instagram</a> | 
                    <a href="https://www.threads.net/%40pierrybos" target="_blank">Threads</a> | 
                    <a href="https://www.facebook.com/bos.pierry/" target="_blank">Facebook</a> | 
                    <a href="https://br.linkedin.com/in/bos-pierry" target="_blank">LinkedIn</a>
                </p>

                <h3>💡 Principais Informações</h3>
                <ul>
                    <li>💻 Desenvolvedor de software com 12 anos de experiência.</li>
                    <li>🚀 Experiência com tecnologias modernas, incluindo Next.js e React.</li>
                    <li>📊 Atuação na área pública, com foco em desenvolvimento de sistemas para o TRF4.</li>
                    <li>🌍 Participação ativa na comunidade tech em Porto Alegre.</li>
                </ul>

                <h3>🎓 Formação Acadêmica</h3>
                <p>📚 (Não há informações públicas disponíveis sobre formação acadêmica)</p>
            </div>

            <div className="step" data-x="-2000" data-y="1000" data-rotate="30">
                <h3>Quem é Piérry Bos?</h3>
                <h2><strog>Cristão</strog> | Desenvolvedor | Programador no TRF4 | Porto Alegre</h2>

                <p><strong>📍 Localização:</strong> Porto Alegre, RS</p>
                <p><strong>💼 Cargo Atual:</strong> Programador no Tribunal Regional Federal da 4ª Região (TRF4)</p>
                <p><strong>🗓️ Anos de Experiência:</strong> <s>12</s> 15 anos (desde <s>2013</s> 2010)</p>

                <h3>📱 Redes Sociais</h3>
                <p>
                    <a href="https://www.instagram.com/pierrybos/" target="_blank">Instagram</a> | 
                    <a href="https://www.threads.net/%40pierrybos" target="_blank">Threads</a> | 
                    <a href="https://www.facebook.com/bos.pierry/" target="_blank">Facebook</a> | 
                    <a href="https://br.linkedin.com/in/bos-pierry" target="_blank">LinkedIn</a>
                </p>

                <h3>💡 Principais Informações</h3>
                <ul>
                    <li>✝️ Cristão conheceu Jesus em 2008, e adventista 📖 em 2018.</li>
                    <li>💻 Desenvolvedor de software com <s>12</s>15 anos de experiência.</li>
                    <li>🚀 Experiência com tecnologias modernas, incluindo Next.js e React.</li>
                    <li>📊 Atuação na área pública, com foco em desenvolvimento de sistemas para o TRF4.</li>
                    <li>🌍 <s>Participação ativa na comunidade tech em Porto Alegre.</s></li>
                </ul>

                <h3>🎓 Formação Acadêmica</h3>
                <p>📚 <s>(Não há informações públicas disponíveis sobre formação acadêmica)</s></p>
                <p>📚 Atualmente cursando superior em Tenologia de Inteligência Artificial pela UNIFAEL</p>
            </div>

            <div className="step" data-x="4000" data-y="0" data-rotate="40">
                <h2>Por que essas diferenças?</h2>
                <p>Por quê esses erros?</p>
            </div>

            {/* Slide 5 - Como nasceu a IA */}
            <div className="step" data-x="5000" data-y="0" data-rotate="50">
                <h2>O que é a IA?</h2>
                <h2>Como nasceu?</h2>
            </div>

            <div className="step" data-x="6000" data-y="0" data-rotate="60">
                <h2>O que é a IA?</h2>
                <p>Inteligência artificial (IA) é uma tecnologia que permite que máquinas aprendam, raciocinem e executem tarefas que normalmente requerem inteligência humana</p>
                <p>A inteligência artificial (IA) é um ramo da ciência da computação que visa desenvolver sistemas e máquinas capazes de executar tarefas que tradicionalmente requerem inteligência humana. Essas tarefas incluem reconhecimento de padrões, solução de problemas, compreensão de linguagem natural e tomada de decisões. </p>
                <span>fonte: https://programae.org.br/inteligencia/como-entrar-na-inteligencia-artificial/</span>
            </div>

            <div className="step" data-x="8000" data-y="0" data-rotate="80">
                <h2>Como nasceu?</h2>
                <h1>📜 Linha do Tempo da Inteligência Artificial</h1>
                <h2>Do Perceptron ao GPT-4</h2>
            </div>

            {/* Slide 2 - Primeiras Ideias */}
            <div className="step" data-x="9000" data-y="0" data-rotate="90">
                <h2>🔹 Antes de 1950</h2>
                <ul>
                    <li>1936 - Alan Turing propõe a "Máquina de Turing".</li>
                    <li>1943 - McCulloch & Pitts desenvolvem o primeiro neurônio artificial.</li>
                    <li>1950: Teste de Turing é proposto para avaliar se uma máquina pode exibir inteligência humana.</li>
                </ul>
            </div>

            {/* Slide 3 - Fundação da IA */}
            <div className="step" data-x="10000" data-y="0" data-rotate="100">
                <h2>🔹 1950 - 1960</h2>
                <ul>
                    <li>1952: Primeiro programa de IA jogando damas é desenvolvido por Christopher Strachey.</li>                    
                    <li>1956 - O termo "Inteligência Artificial" é cunhado na Conferência de Dartmouth.</li>
                    <li>1958 - Frank Rosenblatt cria o Perceptron, a primeira rede neural treinável.</li>
                </ul>
            </div>

            {/* Slide 4 - Primeiro Inverno da IA */}
            <div className="step" data-x="10000" data-y="0" data-scale="110">
                <h2>🔹 1960 - 1980</h2>
                <ul>
                    <li>1969 - Marvin Minsky mostra as limitações do Perceptron.</li>
                    <li>1973-1980 - Primeiro inverno da IA (falta de avanços práticos).</li>
                    <li>1986 - Geoffrey Hinton aprimora o Backpropagation.</li>
                </ul>
            </div>

            {/* Slide 5 - Crescimento da IA */}
            <div className="step" data-x="10000" data-y="0" data-scale="120">
                <h2>🔹 1980 - 2000</h2>
                <ul>
                    <li>1997 - Deep Blue (IBM) derrota Garry Kasparov no xadrez.</li>
                    <li>1999 - Primeiros assistentes virtuais surgem.</li>
                </ul>
            </div>

            {/* Slide 6 - Era do Deep Learning */}
            <div className="step" data-x="10000" data-y="0" data-scale="130">
                <h2>🔹 2000 - 2020</h2>
                <ul>
                    <li>2006 - Geoffrey Hinton populariza redes neurais profundas.</li>
                    <li>2012 - AlexNet revoluciona reconhecimento de imagens.</li>
                    <li>2016 - AlphaGo vence o campeão mundial de Go.</li>
                </ul>
            </div>

            {/* Slide 7 - IA Moderna */}
            <div className="step" data-x="10000" data-y="0" data-scale="140">
                <h2>🔹 2020 - Presente</h2>
                <ul>
                    <li>2020 - GPT-3 com 175 bilões de parâmetros.</li>
                    <li>2023 - GPT-4 aprimora raciocínio e habilidades multimodais.</li>
                    <li>2024 - IA multimodal combina texto, imagem e vídeo.</li>
                </ul>
            </div>

            {/* Slide 8 - O Futuro da IA */}
            <div className="step" data-x="10000" data-y="0" data-scale="150">
                <h2>🔮 O Futuro da IA</h2>
                <ul>
                    <li>AGI (Inteligência Artificial Geral).</li>
                    <li>IA em todas as áreas (medicina, automação, criatividade).</li>
                    <li>Modelos mais eficientes e éticos.</li>
                </ul>
            </div>

            {/* Slide 6 - Como ela funciona */}
            <div className="step" data-x="1000" data-y="1000" data-rotate="50">
                <h2>Como ela funciona?</h2>
                <p>Entendendo os princípios básicos.</p>
            </div>


            <div className="step" data-x="2000" data-y="1000">
                <h1>🧠 Como uma IA Aprende?</h1>
                <p>Vamos ensinar um Perceptron a decidir se um número é maior que 5.</p>
                <p>Ele começará errando e aprenderá ajustando seus pesos!</p>
            </div>

            {/* Slide 2 - O Perceptron Inicial */}
            <div className="step" data-x="3000" data-y="1000">
                <h2>🚀 O Perceptron Inicia</h2>
                <p>Começamos com um peso e um viés aleatórios:</p>
                <p><strong>Peso = 0.5, Viés = -2</strong></p>
                <p>Ele ainda não sabe decidir corretamente!</p>
            </div>

            {/* Slide 3 - Primeiro Teste com 7 */}
            <div className="step" data-x="4000" data-y="1000">
                <h2>🔢 Teste com 7</h2>
                <p>Entrada = **7**, Peso = **0.5**, Viés = **-2**</p>
                <p>Cálculo: (7 × 0.5) + (-2) = **1.5**</p>
                <p>Como 1.5 é maior que 0, saída = **1** (Correto!)</p>
            </div>

            {/* Slide 4 - Teste com 3 (Erro) */}
            <div className="step" data-x="5000" data-y="1000">
                <h2>❌ Teste com 3 (Erro!)</h2>
                <p>Entrada = **3**, Peso = **0.5**, Viés = **-2**</p>
                <p>Cálculo: (3 × 0.5) + (-2) = **-0.5**</p>
                <p>A saída foi **0** (correto), mas queremos usar o erro para treinar.</p>
                <p><strong>Erro = Resposta Correta - Resposta do Perceptron</strong></p>
            </div>

            {/* Slide 5 - Ajustando os Pesos pelo Erro */}
            <div className="step" data-x="6000" data-y="1000">
                <h2>📉 Como Ajustamos?</h2>
                <p>Usamos a fórmula:</p>
                <p><strong>Novo Peso = Peso + (Erro × Entrada × Taxa de Aprendizado)</strong></p>
                <p><strong>Novo Viés = Viés + (Erro × Taxa de Aprendizado)</strong></p>
            </div>

            {/* Slide 6 - Aplicando a Correção */}
            <div className="step" data-x="7000" data-y="1000" >
                <h2>✅ Calculando o Novo Peso e Viés</h2>
                <p>Taxa de Aprendizado = 0.1</p>
                <p>Erro = **Resposta Correta - Resposta Obtida** = 1 - 0 = **1**</p>
                <p><strong>Novo Peso = 0.5 + (1 × 3 × 0.1) = 0.8</strong></p>
                <p><strong>Novo Viés = -2 + (1 × 0.1) = -1.9</strong></p>
            </div>

            {/* Slide 7 - Testando de Novo */}
            <div className="step" data-x="8000" data-y="1000">
                <h2>🔁 Novo Teste com 3</h2>
                <p>Entrada = **3**, Peso = **0.8**, Viés = **-1.9**</p>
                <p>Cálculo: (3 × 0.8) + (-1.9) = **0.5**</p>
                <p>Agora a saída é **1** (agora está correto!)</p>
            </div>


            <div className="step" data-x="9000" data-y="1000">
                <h2>Como ficamos</h2>
                <p>Mostrando a maquina:</p>
                <p><strong><a href="/neuronio">Neuronio</a></strong></p>
                <p><strong><a href="/temperatura">Rede Neural:</a></strong></p>
            </div>


            {/* Slide 7 - Usando no dia a dia */}
            <div className="step" data-x="5000" data-y="1000" data-rotate="60">
                <h2>Usando no dia a dia</h2>
                <p>Exemplos práticos de IA no cotidiano.</p>
            </div>

            <div className="step" data-x="5000" data-y="1000" data-rotate="60">
                <a href="https://chat.openai.com">Chat.com - ChatGPT</a>
                <a href="https://www.deepseek.com/">DeepSeek</a>
            </div>


            <div class="step" data-x="6000" data-y="1000">
            <h2>There's An AI For That</h2>
            <p><strong>Link:</strong> <a href="https://theresanaiforthat.com" target="_blank">theresanaiforthat.com</a></p>
            <p><strong>O que é:</strong> Um banco de dados abrangente de ferramentas de IA organizadas por categorias, como marketing, design, educação, saúde, etc.</p>
            <p><strong>Destaque:</strong> Permite buscar ferramentas por tarefa específica (ex.: "tradução de texto" ou "geração de imagens").</p>
        </div>

        <div class="step" data-x="7000" data-y="1000">
            <h2>AI Tools Directory</h2>
            <p><strong>Link:</strong> <a href="https://www.aitoolsdirectory.com" target="_blank">aitoolsdirectory.com</a></p>
            <p><strong>O que é:</strong> Um diretório organizado de ferramentas de IA, com descrições detalhadas e links para cada uma.</p>
            <p><strong>Destaque:</strong> Inclui avaliações e comentários de usuários.</p>
        </div>

        <div class="step" data-x="8000" data-y="1000">
            <h2>Product Hunt (Categoria AI)</h2>
            <p><strong>Link:</strong> <a href="https://www.producthunt.com" target="_blank">producthunt.com</a></p>
            <p><strong>O que é:</strong> Uma plataforma para descobrir novos produtos e ferramentas, incluindo muitas soluções de IA.</p>
            <p><strong>Destaque:</strong> Permite ver as ferramentas mais populares e votadas pela comunidade.</p>
        </div>

            {/* Slide 8 - Principais problemas */}
            <div className="step" data-x="9000" data-y="1000" data-rotate="70">
                <h2>Principais problemas</h2>
                <p>Os desafios da inteligência artificial.</p>
            </div>
            
        </div>
        </>
    );
};

export default Presentation;