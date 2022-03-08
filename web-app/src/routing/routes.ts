
export const ApplicationRoutes = {
  home: '/',
  boat: { url: '/boats/:id', getRoute: (id: number) => `/boats/${id}` },
  boat_create: '/boats/create',
  boat_edit: { url: '/boats/:id/edit', getRoute: (id: number) => `/boats/${id}/edit` },
  cm_create: { url: '/boats/:boatId/crew/create', getRoute: (boatId: number) => `/boats/${boatId}/crew/create` },
  cm_edit: { url: '/boats/:boatId/crew/:id/update', getRoute: (boatId: number, id: number) => `/boats/${boatId}/crew/${id}/update` },
}