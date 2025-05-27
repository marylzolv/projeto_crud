function Tabela({ vetor, selecionarProduto, removerProduto }) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vetor.map((produto) => (
            <tr key={produto.codigo}>
              <td>{produto.nome}</td>
              <td>{produto.marca}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => selecionarProduto(produto)}
                >
                  Selecionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
export default Tabela