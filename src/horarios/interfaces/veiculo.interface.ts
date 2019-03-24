import { Document } from 'mongoose';

export interface Veiculo extends Document {
  readonly ROTULO: string;
  readonly DATAHORA: number;
  readonly LOCALIZACAO: number[];
}
