const router = {
  add: '/proyectos/form/add',
  update: (id: string) => `/proyectos/form/update?id=${id}`,
  configEstados: (id: string) => `/proyectos/form/estados?id=${id}`,
  configLeadGroups: (id: string) => `/proyectos/form/lead/groups?id=${id}`,
  configLeadCampos: (id: string) => `/proyectos/form/lead/campos?id=${id}`,
  invitarPersonas: (id: string) => `/proyectos/form/invitar-personas?id=${id}`,
};

export default router;
