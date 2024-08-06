import React, { useState } from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  spotNumber: number;
  isOccupied: boolean;
  existingTicket?: {
    id: number;
    customerName: string;
    customerPlateNumber: string;
  };
  onCreate: (
    spotId: number,
    customerName: string,
    customerPlateNumber: string
  ) => void;
  onDelete: (
    ticketId: number,
    customerName: string,
    customerPlateNumber: string
  ) => void;
}

const ParkingModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  spotNumber,
  isOccupied,
  existingTicket,
  onCreate,
  onDelete,
}) => {
  const [customerName, setCustomerName] = useState<string>(
    existingTicket?.customerName || ""
  );
  const [customerPlateNumber, setCustomerPlateNumber] = useState<string>(
    existingTicket?.customerPlateNumber || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOccupied && existingTicket) {
      onDelete(existingTicket.id, customerName, customerPlateNumber);
    } else {
      onCreate(spotNumber, customerName, customerPlateNumber);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: "400px",
          height: "300px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex flex-col items-center h-full justify-center">
        <h2 className="mb-6 border-l-4 border-custom-yellow pl-4 text-2xl font-bold text-gray-800">
          {isOccupied ? "Cancel Reservation" : "Create Reservation"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label className="text-gray-800" htmlFor="customerName">
              Customer Name:
            </label>
            <input
              id="customerName"
              type="text"
              className="border rounded-md"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-gray-800" htmlFor="customerPlateNumber">
              Plate Number:
            </label>
            <input
              id="customerPlateNumber"
              type="text"
              className="border rounded-md"
              value={customerPlateNumber}
              onChange={(e) => setCustomerPlateNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="mb-2 button">
            {isOccupied ? "Cancel Reservation" : "Create Reservation"}
          </button>
        </form>
        <button className="button" onClick={onRequestClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ParkingModal;
