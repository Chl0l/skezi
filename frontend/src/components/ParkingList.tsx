import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchParkings,
  createTicket,
  deleteTicket,
} from "../redux/ParkingSlice";
import ParkingModal from "./Modal";

interface Ticket {
  id: number;
  customerName: string;
  customerPlateNumber: string;
}

interface Parking {
  tickets?: Ticket[];
  id: number;
  spotNumber: number;
  isOccupied: boolean;
}

const ParkingList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const parkings = useSelector((state: RootState) => state.parking.parkings);
  const [selectedSpot, setSelectedSpot] = useState<Parking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingTicket, setExistingTicket] = useState<
    | {
        id: number;
        customerName: string;
        customerPlateNumber: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    dispatch(fetchParkings());
  }, [dispatch]);

  const openModal = useCallback((spot: Parking) => {
    setSelectedSpot(spot);
    const existingTicket = spot.tickets?.[0];
    setExistingTicket(existingTicket);

    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpot(null);
    setExistingTicket(undefined);
  };

  const handleCreateTicket = async (
    spotNumber: number,
    customerName: string,
    customerPlateNumber: string
  ) => {
    try {
      const spot = parkings.find((p) => p.spotNumber === spotNumber);
      if (!spot) {
        throw new Error("Parking spot not found.");
      }
      await dispatch(
        createTicket({
          spotId: spot.id,
          customerName,
          customerPlateNumber,
        })
      ).unwrap();
      dispatch(fetchParkings());
      closeModal();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleDeleteTicket = async (
    ticketId: number,
    customerName: string,
    customerPlateNumber: string
  ) => {
    try {
      await dispatch(
        deleteTicket({
          id: ticketId,
          customerName,
          customerPlateNumber,
        })
      ).unwrap();
      console.log("Ticket deleted successfully");
      dispatch(fetchParkings());
      closeModal();
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("An error occurred while deleting the ticket.");
    }
  };

  const sortedParkings = [...parkings].sort(
    (a, b) => a.spotNumber - b.spotNumber
  );

  const rows = [];
  for (let i = 0; i < sortedParkings.length; i += 6) {
    rows.push(sortedParkings.slice(i, i + 6));
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 border-l-4 border-custom-yellow pl-4">
        <h2 className="text-2xl font-bold text-gray-800">Parking Spots</h2>
        <span className="text-gray-800">
          Reserve your parking space to be sure of getting one!
        </span>
      </div>
      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="grid grid-cols-6 gap-4 mb-4">
            {row.map((parking: Parking) => (
              <div
                key={parking.id}
                onClick={() => openModal(parking)}
                className={`spot ${
                  parking.isOccupied
                    ? "border-custom-red"
                    : "border-custom-green"
                } border-2 cursor-pointer rounded-sm`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-gray-800">
                    Spot {parking.spotNumber}
                  </span>
                  <span className="text-slate-600 font-light">
                    {parking.isOccupied ? "(occupied)" : "(free)"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {(rowIndex === 0 || rowIndex === 2 || rowIndex === 4) && (
            <div className="mb-8"></div>
          )}
        </React.Fragment>
      ))}
      {selectedSpot && (
        <ParkingModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          spotNumber={selectedSpot.spotNumber}
          isOccupied={selectedSpot.isOccupied}
          existingTicket={existingTicket}
          onCreate={handleCreateTicket}
          onDelete={handleDeleteTicket}
        />
      )}
    </div>
  );
};

export default ParkingList;
