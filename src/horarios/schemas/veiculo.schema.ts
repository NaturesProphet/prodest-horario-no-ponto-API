import * as mongoose from 'mongoose';

export const VeiculoSchema = new mongoose.Schema( {
  ROTULO: String,
  DATAHORA: Number,
  LOCALIZACAO: Array,
} );
