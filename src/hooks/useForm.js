import { useState } from "react";

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({ ...initialState });
  };

  return {
    ...formData, // {name: formData.name, email: formData.email}

    // properties
    formData,

    // methods
    onChange,
    resetForm,
  };
};
