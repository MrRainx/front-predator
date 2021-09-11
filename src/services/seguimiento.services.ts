import { AxiosResponse } from 'axios';
import { AbstractWs, ICrud, Pk } from './Base.service';

export interface ISeguimiento {}

export class SeguimientoWS
  extends AbstractWs
  implements ICrud<ISeguimiento, Pk>
{
  uri = 'seguimientos-leads/';
  create: (model: ISeguimiento) => Promise<AxiosResponse<ISeguimiento>>;
  update: (id: Pk, model: ISeguimiento) => Promise<AxiosResponse<ISeguimiento>>;
  delete: (id: Pk) => void;
  reasignar({ idUsuario, idGrupo, proyectoCodigo, idEstado = null }: any) {
    return this.getApi().put<any>(`${this.getUri()}reasignar/`, {
      idUsuario,
      idGrupo,
      proyectoCodigo,
      idEstado,
    });
  }
}
