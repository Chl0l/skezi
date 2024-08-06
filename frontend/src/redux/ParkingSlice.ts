import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
  fetchParkings as fetchParkingsAPI,
  createTicket as createTicketAPI,
  deleteTicket as deleteTicketAPI,
} from "../api";

interface Parking {
  id: number;
  spotNumber: number;
  isOccupied: boolean;
}

interface Ticket {
  id: number;
  issuedAt: string;
  customerName: string;
  customerPlateNumber: string;
  parkingSpot: Parking;
}

interface ParkingState {
  parkings: Parking[];
  tickets: Ticket[];
}

const initialState: ParkingState = {
  parkings: [],
  tickets: [],
};

export const fetchParkings = createAsyncThunk(
  "parking/fetchParkings",
  async () => {
    const data = await fetchParkingsAPI();
    return data;
  }
);

export const createTicket = createAsyncThunk(
  "parking/createTicket",
  async (ticket: {
    spotId: number;
    customerName: string;
    customerPlateNumber: string;
  }) => {
    const data = await createTicketAPI(ticket);
    return data;
  }
);

export const deleteTicket = createAsyncThunk(
  "parking/deleteTicket",
  async (payload: {
    id: number;
    customerName: string;
    customerPlateNumber: string;
  }) => {
    await deleteTicketAPI(
      payload.id,
      payload.customerName,
      payload.customerPlateNumber
    );
    return payload.id;
  }
);

const parkingSlice = createSlice({
  name: "parking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParkings.fulfilled, (state, action) => {
        state.parkings = action.payload;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
        const parkingSpot = state.parkings.find(
          (parking) => parking.id === action.payload.parkingSpot.id
        );
        if (parkingSpot) {
          parkingSpot.isOccupied = true;
        }
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        const ticketId = action.payload;

        const ticketToRemove = state.tickets.find(
          (ticket) => ticket.id === ticketId
        );

        if (ticketToRemove) {
          state.tickets = state.tickets.filter(
            (ticket) => ticket.id !== ticketId
          );

          const parkingSpot = state.parkings.find(
            (parking) => parking.id === ticketToRemove.parkingSpot.id
          );

          if (parkingSpot) {
            parkingSpot.isOccupied = false;
          }
        }
      });
  },
});

export const selectAllParkings = (state: RootState) => state.parking.parkings;

export default parkingSlice.reducer;
