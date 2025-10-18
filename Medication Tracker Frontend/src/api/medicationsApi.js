import axios from "axios";

const API_URL = "http://localhost:5000/api/medications";

export const getMedications = () => axios.get(API_URL);
export const addMedication = (data) => axios.post(API_URL, data);
export const updateMedication = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMedication = (id) => axios.delete(`${API_URL}/${id}`);
