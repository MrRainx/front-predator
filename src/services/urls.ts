export const URL_BASE = 'http://127.0.0.1:8000/';

export const APPS = {
  USUARIOS: 'usuarios/',
  PROYECTOS: 'proyectos/',
  ESTADOS_LEADS: 'estados-leads/',
  CONFIG_GRUPOS_LEADS: 'config-grupos-leads/',
};

export const getTokenUrl = `${APPS.USUARIOS}token/`;

export const refreshTokenUrl = `${APPS.USUARIOS}refresh-token/`;

export const createProyectoUrl = `${APPS.PROYECTOS}`;

export const updateProyectoUrl = (id: string) => `${APPS.PROYECTOS}${id}/`;

export const createEstadoProyectoUrl = `${APPS.ESTADOS_LEADS}`;
export const deleteEstadoProyectoUrl = (id: string) => {
  return `${APPS.ESTADOS_LEADS}${id}/`;
};
export const updateEstadoProyectoUrl = (id: string) => {
  return `${APPS.ESTADOS_LEADS}${id}/`;
};

/**
 * CONFIGURACIONES DE GRUPOS DE LEAD
 */
export const createConfigGrupoLeadUrl = `${APPS.CONFIG_GRUPOS_LEADS}`;
export const deleteConfigGrupoLeadUrl = (id: string | number) => {
  return `${APPS.CONFIG_GRUPOS_LEADS}${id}/`;
};
export const updateConfigGrupoLeadUrl = (id: string | number) => {
  return `${APPS.CONFIG_GRUPOS_LEADS}${id}/`;
};
