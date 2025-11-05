import React, { useEffect, useState } from "react";
import apiClient from "../../../api/apiClient";
import { useSelector } from "react-redux";

const FinePayment = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      const data = await apiClient.get("/borrowrecords/");
      const unpaidFines = data.filter(
        (record) =>
          record.user === user.id && record.fine_amount > 0 && !record.fine_paid
      );
      setRecords(unpaidFines);
    } catch (error) {
      console.error("Error fetching fines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (id) => {
    try {
      const response = await apiClient.post(`/borrowrecords/${id}/pay_fine/`);
      alert(response.message);
      fetchFines();
    } catch (error) {
      alert("Error paying fine: " + error.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading fines...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
         Pending Fine Payments
      </h2>

      {records.length === 0 ? (
        <p className="text-center text-gray-500">No unpaid fines </p>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="border p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{rec.book_title}</h3>
                <p>Fine Amount: ₹{rec.fine_amount}</p>
                <p>Due Date: {new Date(rec.due_date).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handlePayment(rec.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Pay Fine
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinePayment;
