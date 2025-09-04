"use client";
import { useForm } from "react-hook-form";
import "./page.css";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    } else {
      alert("❌ Please upload a school image before submitting.");
      return; 
    }

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add school");

      alert("✅ School Added Successfully!");
      reset(); // clear form only after success
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to add school");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Add School 🏫</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-group">
            <input {...register("name", { required: "Name is required" })} placeholder="School Name" />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <input {...register("address", { required: "Address is required" })} placeholder="Address" />
            {errors.address && <p className="error">{errors.address.message}</p>}
          </div>

          <div className="form-row">
            <input {...register("city", { required: "City is required" })} placeholder="City" />
            <input {...register("state", { required: "State is required" })} placeholder="State" />
          </div>
          {errors.city && <p className="error">{errors.city.message}</p>}
          {errors.state && <p className="error">{errors.state.message}</p>}

          <div className="form-group">
            <input {...register("contact", { required: "Contact is required" })} placeholder="Contact" />
            {errors.contact && <p className="error">{errors.contact.message}</p>}
          </div>

          <div className="form-group">
            <input type="email" {...register("email_id", { required: "Email is required" })} placeholder="Email" />
            {errors.email_id && <p className="error">{errors.email_id.message}</p>}
          </div>

          <div className="form-group">
            <input type="file" {...register("image", { required: "Please upload an image" })} />
            {errors.image && <p className="error">{errors.image.message}</p>}
          </div>

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
