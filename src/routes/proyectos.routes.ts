const router = {
  add: '/proyectos/form/add',
  update: (id: string) => `/proyectos/form/update?id=${id}`,
  configEstados: (id: string) => `/prouyectos/form/estados?id=${id}`,
};

export default router;
