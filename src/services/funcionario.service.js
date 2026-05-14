import FuncionarioRepository from '../repositories/funcionario.repository.js';
import { FuncionarioResponseDTO } from '../dtos/funcionario.dto.js';

class FuncionarioService {
    static async getAll() {
        const funcionarios = await FuncionarioRepository.findAll();
        return funcionarios.map(f => new FuncionarioResponseDTO(f));
    }

    static async getById(id) {
        const funcionario = await FuncionarioRepository.findById(id);

        if (!funcionario) {
            const error = new Error('Funcionário não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        return new FuncionarioResponseDTO(funcionario);
    }

    static async contratar(dados) {
        delete dados.id;

        if (dados.email) {
            dados.email = dados.email.toLowerCase();
            const emailExistente = await FuncionarioRepository.findByEmail(dados.email);

            if (emailExistente) {
                const error = new Error('Este e-mail já está cadastrado no sistema.');
                error.statusCode = 409;
                throw error;
            }
        }

        const novoFuncionario = await FuncionarioRepository.create(dados);
        return new FuncionarioResponseDTO(novoFuncionario);
    }

    static async atualizar(id, dados, idSolicitante) {
        const funcionarioAlvo = await FuncionarioRepository.findById(id);
        const solicitante = await FuncionarioRepository.findById(idSolicitante);

        if (!funcionarioAlvo || !solicitante) {
            const error = new Error('Funcionário não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        if (!solicitante.ativo) {
            const error = new Error('Funcionários inativos não podem realizar alterações.');
            error.statusCode = 403;
            throw error;
        }

        if (dados.cargo && id === Number(idSolicitante)) {
            const error = new Error('Não é permitido alterar o próprio cargo.');
            error.statusCode = 403;
            throw error;
        }

        if (dados.cargo && solicitante.cargo !== 'Gerente') {
            const error = new Error('Apenas gerentes podem alterar cargos na equipe.');
            error.statusCode = 403;
            throw error;
        }

        delete dados.id;

        const atualizado = await FuncionarioRepository.update(id, dados);
        return new FuncionarioResponseDTO(atualizado);
    }

    static async inativar(id, idSolicitante) {
        const solicitante = await FuncionarioRepository.findById(idSolicitante);

        if (!solicitante || !solicitante.ativo) {
            const error = new Error('Acesso negado ou funcionário inativo.');
            error.statusCode = 403;
            throw error;
        }

        const sucesso = await FuncionarioRepository.inactivate(id);

        if (!sucesso) {
            const error = new Error('Funcionário não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        return { mensagem: 'Funcionário inativado com sucesso.' };
    }
}

export default FuncionarioService;
