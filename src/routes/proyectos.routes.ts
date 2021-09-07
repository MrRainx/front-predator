import { Pk } from 'src/services/Base.service';

const router = {
  listado: '/proyectos',
  add: '/proyectos/form/add',
  update: (id: string) => `/proyectos/form/update?id=${id}`,
  detalle: (codigo: string) => `/proyectos/${codigo}`,
  configEstados: (id: string) => `/proyectos/form/estados?id=${id}`,
  configLeadGroups: (id: string) => `/proyectos/form/lead/groups?id=${id}`,
  configLeadCampos: (id: string) => `/proyectos/form/lead/campos?id=${id}`,
  invitarPersonas: (id: string) => `/proyectos/form/invitar-personas?id=${id}`,
  misInvitaciones: `/proyectos/invitaciones/`,
  invitacionProyecto(id: Pk) {
    return this.misInvitaciones + id;
  },
};

export default router;
