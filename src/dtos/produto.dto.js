export class ProdutoResponseDTO {
    constructor(produto) {
        this.id = produto.id;
        this.referencia = produto.referencia;
        this.nome = produto.nome;
        this.categoria = produto.categoria;
        this.tamanho = produto.tamanho;
        this.preco = Number(produto.preco).toFixed(2);
        this.estoque = produto.estoque;

        this.cadastradoPor = produto.cadastradoPor;

        this.disponivel = produto.estoque > 0;
        this.ativo = produto.ativo !== false;
    }
}