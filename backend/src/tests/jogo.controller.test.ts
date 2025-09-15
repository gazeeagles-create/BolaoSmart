import * as jogoModel from '../models/jogo.model';
import { Jogo } from '../types/jogo.types';

describe('Jogo Controller / Model', () => {
  it('deve criar um jogo com sucesso', async () => {
    const mockJogo: Jogo = {
      bolaoId: 'bolao123', // Substituir por ID real
      numeros: [5, 12, 23, 34, 45, 56]
    };

    const result = await jogoModel.createJogo(mockJogo);
    expect(result).toHaveProperty('id');
    expect(result.numeros.length).toBe(6);
  });

  it('deve retornar todos os jogos de um bolão', async () => {
    const jogos = await jogoModel.getJogosByBolaoId('bolao123');
    expect(Array.isArray(jogos)).toBe(true);
  });
});
