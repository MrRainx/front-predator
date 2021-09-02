export const URL_BASE = 'http://127.0.0.1:8000/';

export const APPS = {
  USUARIOS: 'usuarios/',
  PROYECTOS: 'proyectos/',
};

export const getTokenUrl = `${APPS.USUARIOS}token/`;

export const refreshTokenUrl = `${APPS.USUARIOS}refresh-token/`;

export const createProyectoUrl = `${APPS.PROYECTOS}`;

export const updateProyectoUrl = (id: string) => `${APPS.PROYECTOS}${id}/`;
