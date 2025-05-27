import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

function App() {
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [produtoEditar, setProdutoEditar] = useState(null);

  function carregarProdutos() {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProdutos(retorno_convertido));
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function cadastrarProduto(produto) {
    fetch("http://localhost:8080/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar produto");
        return res.json();
      })
      .then(() => {
        alert("Produto cadastrado com sucesso!");
        carregarProdutos();
      })
      .catch((erro) => alert(erro.message));
  }

  function alterarProduto(produto) {
    fetch("http://localhost:8080/alterar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao alterar produto");
        return res.json();
      })
      .then(() => {
        alert("Produto alterado com sucesso!");
        cancelarEdicao();
        carregarProdutos();
      })
      .catch((erro) => alert(erro.message));
  }

  function removerProduto(codigo) {
    fetch(`http://localhost:8080/remover/${codigo}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao remover produto");
        return res.json();
      })
      .then(() => {
        alert("Produto removido com sucesso!");
        carregarProdutos();
        cancelarEdicao();
      })
      .catch((erro) => alert(erro.message));
  }
  
  function cancelarEdicao() {
    setProdutoEditar(null);
    setBtnCadastrar(true);
  }

  function selecionarProduto(produto) {
    setProdutoEditar(produto);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <header className="app-header">
        <h1>Gerenciador de Estoque</h1>
        <p>Organize seus produtos com eficiência</p>
      </header>

      <main className="app-main">
        <Formulario
          botao={btnCadastrar}
          produtoEditar={produtoEditar}
          cadastrarProduto={cadastrarProduto}
          aoAlterar={alterarProduto}
          aoRemover={removerProduto}
          aoCancelar={cancelarEdicao}
        />
        <Tabela
          vetor={produtos}
          selecionarProduto={selecionarProduto}
          removerProduto={removerProduto}
        />
      </main>

      <footer className="app-footer">
        <p>© 2025 Gerenciador de Estoque - Desenvolvido por Você</p>
      </footer>
    </div>
  );
}

export default App;
