import { useEffect, useState } from "react";

function Formulario({
  botao,
  cadastrarProduto,
  aoAlterar,
  aoRemover,
  aoCancelar,
  produtoEditar,
}) {
  const [produto, setProduto] = useState({
    code: null,
    nome: "",
    marca: "",
  });

  useEffect(() => {
    if (produtoEditar) {
      setProduto(produtoEditar);
    } else {
      setProduto({ code: null, nome: "", marca: "" });
    }
  }, [produtoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (botao) {
      cadastrarProduto(produto);
    } else {
      if (produto.code !== null) {
        aoAlterar(produto);
      } else {
        alert("Erro: Produto sem código para edição.");
      }
    }

    setProduto({ code: null, nome: "", marca: "" });
  };

  const handleRemover = () => {
    if (produto.code !== null && produto.code !== undefined) {
      aoRemover(produto.code);
      setProduto({ code: null, nome: "", marca: "" });
    } else {
      alert("Código inválido para remoção");
      console.log("Tentando remover:", produto);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h2 className="mb-4">Gerenciar produtos</h2>

      <div className="mb-3">
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={produto.nome}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="marca"
          placeholder="Marca do produto"
          value={produto.marca}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {botao ? "Cadastrar" : "Alterar"}
        </button>

        {!botao && (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={aoCancelar}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleRemover}
            >
              Remover
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default Formulario;
