import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import serverURL from "../../serverURL.js";

const UserManagement = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roles = user?.["https://cafecore/roles"] || [];
    if (!roles.includes("admin")) {
      toast.error("Access denied. Admin only.");
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const getAuthHeaders = async () => {
    const token = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: "openid profile email",
    });
    return { Authorization: `Bearer ${token}` };
  };

  const fetchUsers = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${serverURL}/api/users`, { headers });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (
      !window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)
    ) {
      return;
    }
    try {
      const headers = await getAuthHeaders();
      await axios.put(`${serverURL}/api/users/${userId}/role`, { role: newRole }, { headers });
      toast.success("User role updated successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm("Are you sure you want to delete this user? This action cannot be undone.")
    ) {
      return;
    }
    try {
      const headers = await getAuthHeaders();
      await axios.delete(`${serverURL}/api/users/${userId}`, { headers });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... your JSX for the table unchanged ... */}
    </div>
  );
};

export default UserManagement;
