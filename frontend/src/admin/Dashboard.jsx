import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hàm kiểm tra và lấy token và role
  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/admin/login");
      return false;
    }
    return token;
  };

  useEffect(() => {
    const fetchTours = async () => {
      const token = checkAuth(); // Kiểm tra token và role
      if (!token) return;

      try {
        const response = await fetch(`${BASE_URL}/tours`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Failed to fetch tours.");
        }

        const data = await response.json();
        setTours(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = checkAuth(); // Kiểm tra token và role
    if (!token) return;

    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Error deleting tour.");
      }

      // Cập nhật danh sách tour sau khi xóa
      setTours((prevTours) => prevTours.filter((tour) => tour._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Danh Sách Tour</h2>
      {loading && <h3 className="text-center">Loading...</h3>}
      {error && <h3 className="text-center text-danger">Error: {error}</h3>}
      {!loading && !error && (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Tour</th>
              <th>Mô Tả</th>
              <th>Giá</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour._id}>
                <td>{index + 1}</td>
                <td>{tour.title}</td>
                <td>{tour.desc}</td>
                <td>{tour.price}</td>
                <td>
                  <Button color="danger" onClick={() => handleDelete(tour._id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Dashboard;
