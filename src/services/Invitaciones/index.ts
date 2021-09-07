import { AbstractWs, ICrud, Pk } from '../Base.service';

export interface IInvitacion {
  id?: Pk;
  proyectoId?: Pk;
  proyecto?: Pk | any;
  usuario?: Pk | any;
  estado?: number;
  estadoStr?: string;
}

export class InvitacionesWS
  extends AbstractWs
  implements ICrud<IInvitacion, Pk>
{
  uri = 'invitaciones/';

  create(model: IInvitacion) {
    return this.getApi().post<IInvitacion>(this.getUri(), model);
  }

  update(id: Pk, model: IInvitacion) {
    return this.getApi().put<IInvitacion>(this.getPkUri(id), model);
  }

  delete(id: Pk) {
    return this.getApi().delete(this.getPkUri(id));
  }
}
