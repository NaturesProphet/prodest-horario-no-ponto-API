import { Connection } from 'mongoose';
import { VeiculoSchema } from './schemas/veiculo.schema';

export const VeiculoProviders = [
  {
    provide: 'VEICULO_MODEL',
    useFactory: ( connection: Connection ) => connection.model( 'veiculos', VeiculoSchema ),
    inject: [ 'DATABASE_CONNECTION' ],
  },
];
