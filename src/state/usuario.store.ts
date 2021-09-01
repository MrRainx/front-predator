import global from '@constants/global';
import { EstadoInvitacion } from '@graphql/auth/enums';
import { removeItem } from '@utils/storage';
import {
  createHook,
  createStore,
  defaults,
  StoreActionApi,
} from 'react-sweet-state';

defaults.devtools = true;

export type UsuarioStoreType = {
  id: string | number;
  username: string;
  email: string;
  invitaciones: any[];
  misProyectos: any[];
  proyectosParticipo: any[];
};

export const initialState: UsuarioStoreType = {
  id: null,
  username: null,
  email: null,
  invitaciones: [],
  misProyectos: [],
  proyectosParticipo: [],
};

export type ActionType = StoreActionApi<UsuarioStoreType>;

const estadoInvitacionPredicate = (estado: EstadoInvitacion) => {
  return (invitacion: any) => {
    return invitacion.estado === estado;
  };
};

const UsuarioStore = createStore({
  name: 'Usuario',
  initialState,
  actions: {
    setUsuario: (state) => {
      return ({ setState }) => {
        setState({
          ...state,
          invitaciones: state.invitaciones.filter(
            estadoInvitacionPredicate(EstadoInvitacion.PENDIENTE),
          ),
          misProyectos: state?.invitaciones?.filter(
            (invitacion) =>
              invitacion?.proyecto?.administrador?.id === state.id,
          ),
          proyectosParticipo: state?.invitaciones?.filter(
            estadoInvitacionPredicate(EstadoInvitacion.ACEPTADA),
          ),
        });
      };
    },
    logout: () => {
      return ({ setState }) => {
        setState(initialState);
        removeItem(global.TOKEN);
        removeItem(global.REFRESH_TOKEN);
      };
    },
  },
});

export const hook = createHook(UsuarioStore);

export const useUsuario = () => {
  const [state, actions] = hook();
  return { ...actions, ...state };
};
