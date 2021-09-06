import { EstadoInvitacionStr } from './enums';

export const estadoInvitacionPredicate = (estado: EstadoInvitacionStr) => {
  return (invitacion) => invitacion.estadoStr === estado;
};
