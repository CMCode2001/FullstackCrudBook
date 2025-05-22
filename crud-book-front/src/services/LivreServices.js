import axios from "axios";

const API_URL = "http://localhost:8088/api-book";

export const fetchLivres = () => axios.get(`${API_URL}/allbooks`)

export const createLivre = (livre) => axios.post(`${API_URL}/create`, livre)

export const updateLivre = (id, livre) => axios.put(`${API_URL}/update/${id}`, livre)

export const deleteLivre = (id) => axios.delete(`${API_URL}/delete/${id}`)