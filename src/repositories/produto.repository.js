import db from '../config/database.js';

class ProdutoRepository {
    static async findAll() {
        await db.read();
        return db.data.produtos;
    }

    static async findById(id) {
        await db.read();
        return db.data.produtos.find(p => p.id === Number(id));
    }

    static async create(produtoData) {
        await db.read();
        const produtos = db.data.produtos;

        const proximoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

        const novoProduto = { id: proximoId, ...produtoData, ativo: true };
        produtos.push(novoProduto);

        await db.write();
        return novoProduto;
    }

    static async update(id, produtoData) {
        await db.read();
        const index = db.data.produtos.findIndex(p => p.id === Number(id));

        if (index === -1) return null;

        db.data.produtos[index] = { id: Number(id), ...produtoData };
        await db.write();

        return db.data.produtos[index];
    }

    static async partialUpdate(id, produtoData) {
        await db.read();
        const index = db.data.produtos.findIndex(p => p.id === Number(id));

        if (index === -1) return null;

        db.data.produtos[index] = { ...db.data.produtos[index], ...produtoData, id: Number(id) };
        await db.write();

        return db.data.produtos[index];
    }

    static async delete(id) {
        await db.read();
        const index = db.data.produtos.findIndex(p => p.id === Number(id));

        if (index === -1) return false;

        db.data.produtos.splice(index, 1);
        await db.write();
        return true;
    }
}

export default ProdutoRepository;