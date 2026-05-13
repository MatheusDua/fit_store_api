import db from '../config/database.js';

class FuncionarioRepository {
    static async findAll() {
        await db.read();
        return db.data.funcionarios;
    }

    static async findById(id) {
        await db.read();
        return db.data.funcionarios.find(f => f.id === Number(id));
    }

    static async findByEmail(email) {
        await db.read();
        return db.data.funcionarios.find(f => f.email === email);
    }

    static async findByName(nome) {
        await db.read();
        return db.data.funcionarios.filter(f =>
            f.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    static async create(dados) {
        await db.read();

        const ultimoFuncionario = db.data.funcionarios[db.data.funcionarios.length - 1];
        const novoId = ultimoFuncionario ? ultimoFuncionario.id + 1 : 1;

        const novoFuncionario = { id: novoId, ...dados, ativo: true };

        db.data.funcionarios.push(novoFuncionario);
        await db.write();
        return novoFuncionario;
    }

    static async update(id, dados) {
        await db.read();
        const index = db.data.funcionarios.findIndex(f => f.id === Number(id));

        if (index !== -1) {
            db.data.funcionarios[index] = { ...db.data.funcionarios[index], ...dados, id: Number(id) };
            await db.write();
            return db.data.funcionarios[index];
        }

        return null;
    }

    static async inactivate(id) {
        await db.read();
        const funcionario = db.data.funcionarios.find(f => f.id === Number(id));

        if (funcionario) {
            funcionario.ativo = false;
            await db.write();
            return true;
        }

        return false;
    }
}

export default FuncionarioRepository;

