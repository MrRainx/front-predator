import { AbstractWs, ICrud, Pk } from './Base.service';

export interface ICredencialExterna {
  id?: Pk;
  nombre?: string;
  codigo?: string;
  descripcion?: string;
  isActive?: boolean;
  proyecto?: Pk | any;
  jwtToken?: string;
}

export class CredencialExternaWS
  extends AbstractWs
  implements ICrud<ICredencialExterna, Pk>
{
  uri = 'credenciales-externas/';

  create(model: ICredencialExterna) {
    return this.getApi().post<ICredencialExterna>(this.getUri(), model);
  }
  update(id: Pk, model: ICredencialExterna) {
    return this.getApi().put<ICredencialExterna>(this.getPkUri(id), model);
  }
  delete(id: Pk) {
    return this.getApi().delete(this.getPkUri(id));
  }
}
