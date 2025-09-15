import * as bolaoModel from '../models/bolao.model';
import { Bolao } from '../types/bolao.types';

describe('Bolão Controller / Model', () => {
  it('deve criar um bolão com sucesso', async () => {
    const mockBolao: Bolao = {
      nome: 'Bolão Teste',
      descricao: 'Teste de criação',
      criadoPor: 'usuario123'
    };

    // Testa função real (irá realmente tentar gravar no Supabase)
    const result = await bolaoModel.createBolao(mockBolao);

    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockBolao.nome);
  });

  it('deve retornar um bolão pelo ID', async () => {
    const bolao = await bolaoModel.getBolaoById('ID_EXISTENTE'); // Substituir por ID real
    expect(bolao).toBeDefined();
    expect(bolao).toHaveProperty('id');
  });
});
