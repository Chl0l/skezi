import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchParkings = async () => {
  const response = await api.get("/parking");
  return response.data;
};

export const createTicket = async (ticketData: {
  spotId: number;
  customerName: string;
  customerPlateNumber: string;
}) => {
  const response = await api.post("/tickets", ticketData);
  return response.data;
};

export const deleteTicket = async (
  ticketId: number,
  customerName: string,
  customerPlateNumber: string
) => {
  const response = await api.delete(`/tickets/${ticketId}`, {
    data: {
      customerName,
      customerPlateNumber,
    },
  });
  return response.data;
};
