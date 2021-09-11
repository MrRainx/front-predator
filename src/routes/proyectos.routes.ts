import { Pk } from 'src/services/Base.service';

const router = {
  listado: '/proyectos/',
  add: '/proyectos/form/add',
  update: (id: Pk) => `/proyectos/form/update?id=${id}`,
  detalle: (codigo: Pk) => `/proyectos/${codigo}`,
  configEstados: (id: Pk) => `/proyectos/form/estados?id=${id}`,
  configLeadGroups: (id: Pk) => `/proyectos/form/lead/groups?id=${id}`,
  configLeadCampos: (id: Pk) => `/proyectos/form/lead/campos?id=${id}`,
  invitarPersonas: (id: Pk) => `/proyectos/form/invitar-personas?id=${id}`,
  credencialesExternas(id: Pk) {
    return `${this.listado}form/credenciales-externas?id=${id}`;
  },
  credencialExterna(idProyecto: Pk, idCredencial: Pk) {
    return `${this.listado}form/credencial-externa?id=${idProyecto}&credencial=${idCredencial}`;
  },
  misInvitaciones: `/proyectos/invitaciones/`,
  invitacionProyecto(id: Pk) {
    return this.misInvitaciones + id;
  },
  asignacion(codigo: string) {
    return `${this.listado}${codigo}/asignacion`;
  },
};

export default router;
