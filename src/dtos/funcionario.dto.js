export class FuncionarioResponseDTO {
    constructor(funcionario) {
        this.id = funcionario.id;
        this.nome = funcionario.nome;
        this.email = funcionario.email;
        this.cargo = funcionario.cargo;
        this.ativo = funcionario.ativo;
    }
}

