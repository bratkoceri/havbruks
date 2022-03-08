import { httpClient } from "./httpClient";
import { IBoat, ICrewMember } from "../types";
import { IBoatForm } from "../types";

export async function fetchAllBoats() {
  const { data } = await httpClient.get<IBoat[]>('boats')
  return data
}

export async function fetchBoat(key: string, id: number) {
  const { data } = await httpClient.get<IBoat>(`boats/${id}`)
  return data
}

export async function createBoat(form: IBoatForm) {
  console.log(form)
  const { data } = await httpClient.post<IBoat>(`boats/create`, form)
  return data
}

export async function updateBoat({ boatId, form }: { boatId: number, form: IBoatForm }) {
  const { data } = await httpClient.put<IBoat>(`boats/${boatId}`, form)
  return data
}

export async function deleteBoat(id: number) {
  return httpClient.delete(`boats/delete/${id}`)
}

export async function fetchCM(key: string, boatId: number, id: number) {
  const { data } = await httpClient.get<ICrewMember>(`boats/${boatId}/crew/${id}`)
  return data
}

export async function creteCM({ boatId, form }: { boatId: number, form: ICrewMember }) {
  console.log(form)
  
  const { data } = await httpClient.post<ICrewMember>(`boats/${boatId}/cm/create`, form)
  return data
}