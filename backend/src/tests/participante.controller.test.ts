import * as participanteModel from '../models/participante.model';
import { Participante } from '../types/participante.types';

describe('Participante Controller / Model', () => {
  it('deve adicionar um participante ao bolão', async () => {
    const mock: Participante = {
      bolaoId: 'bolao123',
      usuarioId: 'usuario123',
      status: 'ativo',
    };

    const result = await participanteModel.addParticipante(mock);
    expect(result).toHaveProperty('id');
    expect(result.status).toBe('ativo');
  });

  it('deve listar participantes de um bolão', async () => {
    const participantes = await participanteModel.getParticipantesByBolaoId('bolao123');
    expect(Array.isArray(participantes)).toBe(true);
  });
});

