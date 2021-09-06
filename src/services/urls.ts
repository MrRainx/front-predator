export const URL_BASE = 'http://127.0.0.1:8000/';

export const APPS = {
  USUARIOS: 'usuarios/',
  PROYECTOS: 'proyectos/',
  ESTADOS_LEADS: 'estados-leads/',
  CONFIG_GRUPOS_LEADS: 'config-grupos-leads/',
  CONFIG_CAMPOS_LEADS: 'config-campos-leads/',
  INVITACIONES: 'invitaciones/',
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

/**
 * CONFIGURACIONES DE CAMPOS DE LEADS
 */

export const createConfigCamposLeadUrl = `${APPS.CONFIG_CAMPOS_LEADS}`;
export const deleteConfigCamposLeadUrl = (id: string | number) => {
  return `${APPS.CONFIG_CAMPOS_LEADS}${id}/`;
};
export const updateConfigCamposLeadUrl = (id: string | number) => {
  return `${APPS.CONFIG_CAMPOS_LEADS}${id}/`;
};

/**
 * INVITACIONES A PROYECTO
 */
export const sendInvitacionProyectoUrl = `${APPS.CONFIG_CAMPOS_LEADS}`;
