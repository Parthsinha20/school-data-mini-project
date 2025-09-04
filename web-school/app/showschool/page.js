"use client";
import { useEffect, useState } from "react";
import "./showschool.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  // Fetch schools
  const loadSchools = async () => {
    try {
      const res = await fetch("/api/getSchools");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Error fetching schools:", err);
      setSchools([]);
    }
  };

  useEffect(() => {
    loadSchools();
  }, []);

  // Delete school
  const deleteSchool = async (id) => {
    if (!confirm("Are you sure you want to delete this school?")) return;

    try {
      const res = await fetch(`/api/deleteSchool?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(await res.text());

      alert("✅ School deleted successfully!");
      loadSchools(); // refresh the list
    } catch (err) {
      console.error("Error deleting school:", err);
      alert("❌ Failed to delete school");
    }
  };

  return (
    <div className="schools-container">
      {schools.length === 0 ? (
        <div className="no-schools">No schools found.</div>
      ) : (
        <div className="schools-grid">
          {schools.map((school) => (
            <div key={school.id} className="school-card">
              <img
                className="school-image"
                src={school.image || "/default-school.jpg"}
                alt={school.name}
              />
              <div className="school-body">
                <h2 className="school-name">{school.name}</h2>
                <p className="school-address">{school.address}</p>
                <p className="school-city">{school.city}</p>

                {/* Delete Button */}
                <button
                  className="delete-btn"
                  onClick={() => deleteSchool(school.id)}
                >
                   DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
