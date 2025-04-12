import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Logo3D() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <textGeometry args={["Mente Financeira", { size: 0.5, height: 0.2 }]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}

function Bar3D({ height, x }: { height: number; x: number }) {
  return (
    <mesh position={[x, height / 2, 0]}>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial color="teal" />
    </mesh>
  );
}

function Grafico3D() {
  const dados = [1, 2, 3.5, 2, 4];
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {dados.map((d, i) => (
        <Bar3D key={i} height={d} x={i * 1.2 - 2.5} />
      ))}
    </Canvas>
  );
}

function Simulador3D() {
  const [valor, setValor] = useState(1000);
  const [anos, setAnos] = useState(5);
  const juros = 0.1;
  const montante = valor * Math.pow(1 + juros, anos);
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">Simulador de Juros Compostos</h2>
      <div className="flex gap-4 my-2">
        <label>
          Valor inicial:
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="ml-2 border rounded p-1"
          />
        </label>
        <label>
          Anos:
          <input
            type="number"
            value={anos}
            onChange={(e) => setAnos(Number(e.target.value))}
            className="ml-2 border rounded p-1"
          />
        </label>
      </div>
      <p className="mt-2">
        Montante final: <strong>R$ {montante.toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default function BlogFinancas() {
  const [senha, setSenha] = useState("");
  const [acesso, setAcesso] = useState(false);
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Mente Financeira</h1>
      <div className="h-[200px] border mb-6">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Logo3D />
        </Canvas>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Blog de Finanças</h2>
        <p>
          Aprenda sobre investimentos, economia e como fazer seu dinheiro
          trabalhar por você.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Gráfico Interativo 3D</h2>
        <div className="h-[300px] border">
          <Grafico3D />
        </div>
      </section>
      <section className="mb-8">
        <Simulador3D />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Clube de Membros</h2>
        {acesso ? (
          <div className="p-4 border rounded">
            <h3 className="text-xl font-bold mb-2">Conteúdo Exclusivo</h3>
            <ul className="list-disc list-inside">
              <li>Relatórios mensais de oportunidades de investimento</li>
              <li>Planilhas exclusivas para controle financeiro</li>
              <li>Acesso a lives e análises privadas</li>
            </ul>
          </div>
        ) : (
          <div className="p-4 border rounded">
            <p className="mb-2">Digite a senha para acessar o conteúdo premium:</p>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-1 rounded mr-2"
            />
            <button
              onClick={() => setAcesso(senha === "financeiro123")}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Entrar
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
