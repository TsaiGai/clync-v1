"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth"; 
import { ApartmentTable } from "./page";
import { Button } from "@/components/ui/button";
import { AddApartmentPopover } from "../components/ui/add-apartment-popover";

export default function Dashboard() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserApartments() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();

        const response = await fetch("http://localhost:5000/api/apartments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch apartments");
        }

        const data = await response.json();
        setApartments(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserApartments();
  }, []);

  async function handleDelete(apartmentId) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const token = await user.getIdToken();

      const response = await fetch(`http://localhost:5000/api/apartments/${apartmentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete apartment");
      }

      setApartments(apartments.filter((apartment) => apartment._id !== apartmentId));
    } catch (error) {
      console.error("Failed to delete apartment", error);
    }
  }

  const handleAddApartment = (newApartment) => {
    setApartments((prev) => [...prev, newApartment]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Clync</h1>

      <AddApartmentPopover onAddApartment={handleAddApartment} />

      {loading ? (
        <p>Loading apartments...</p>
      ) : (
        <ApartmentTable apartments={apartments} onDelete={handleDelete} />
      )}
    </div>
  );
}
