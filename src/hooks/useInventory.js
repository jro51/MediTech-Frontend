import { useState, useEffect } from "react";

export function useInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8081/v1/purchase/user/${userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Error al cargar inventario:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (purchaseId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8081/v1/purchase/${purchaseId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setItems(items.filter(item => item.id !== purchaseId));
      }
    } catch (error) {
      console.error("Error al eliminar item:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return { items, loading, deleteItem };
}