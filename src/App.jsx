import { useState } from "react";
import data from "./data/data.json";

function App() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen mx-auto">
      <h2 className="text-4xl mb-8 font-semibold">JSON Schema Form</h2>
      <form className="w-80" onSubmit={submit}>
        {data.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">{field.label}</label>
            {field.type === "text" ||
            field.type === "number" ||
            field.type === "textbox" ||
            field.type === "email" ||
            field.type === "file" ? (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select an option</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
