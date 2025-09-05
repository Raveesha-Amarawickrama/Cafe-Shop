import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import serverURL from "../../serverURL.js";

const MenuManagement = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "coffee",
    image: "",
    inStock: true,
    featured: false,
  });

  const categories = [
    { value: "coffee", label: "Coffee" },
    { value: "tea", label: "Tea" },
    { value: "pastry", label: "Pastries" },
    { value: "sandwich", label: "Sandwiches" },
    { value: "dessert", label: "Desserts" },
  ];

  useEffect(() => {
    // Check if token contains "admin" role
    const roles = user?.["https://cafecore/roles"] || [];
    if (!roles.includes("admin")) {
      toast.error("Access denied. Admin only.");
      navigate("/");
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const getAuthHeaders = async () => {
    const token = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: "openid profile email",
    });
    return { Authorization: `Bearer ${token}` };
  };

  const fetchProducts = async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${serverURL}/api/products`, {
        headers,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = await getAuthHeaders();
      if (editingProduct) {
        await axios.put(
          `${serverURL}/api/products/${editingProduct._id}`,
          formData,
          { headers }
        );
        toast.success("Product updated successfully");
      } else {
        await axios.post(`${serverURL}/api/products`, formData, { headers });
        toast.success("Product added successfully");
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      inStock: product.inStock,
      featured: product.featured,
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const headers = await getAuthHeaders();
      await axios.delete(`${serverURL}/api/products/${productId}`, { headers });
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "coffee",
      image: "",
      inStock: true,
      featured: false,
    });
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
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
      {/* ... rest of your JSX unchanged ... */}
    </div>
  );
};

export default MenuManagement;
