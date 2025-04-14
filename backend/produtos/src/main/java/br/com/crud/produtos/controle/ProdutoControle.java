package br.com.crud.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import br.com.crud.produtos.modelo.ProdutoModelo;
import br.com.crud.produtos.servico.ProdutoServico;

public class ProdutoControle {
  @Autowired
    private ProdutoServico ps; 

    @GetMapping("/listar")
    public Iterable<ProdutoModelo> listar(){
        return ps.listar();
    }

    @GetMapping("/")
    public String rota(){
        return "A API está funcionando!";
    }
}
