import { useEffect, useState } from "react";
import data from "./data/data.json";

function App() {
	const [formData, setFormData] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};
	// useEffect(() => {
	// 	handleInputChange();
	// }, []);

	const submit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("formData", formData);
		setFormErrors(validate(formData));
		setIsSubmit(true);
	};
	useEffect(() => {
		console.log("Errors", formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log("validated", formData);
		}
	}, [formErrors, formData, isSubmit]);
	const validate = (values) => {
		const errors = {};
		const email_regx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const phoneNumRegex = /^(?:\+977)?\d{10}$/;
		if ("name" in values && !values.name) {
			errors.name = "Name is required";
		}
		if ("email" in values && !values.email) {
			errors.email = "Email is required";
		} else if (!email_regx.test(values.email)) {
			errors.email = "This is not a valid email format";
		}
		if ("phone" in values && !values.phone) {
			errors.phone = "Phone is required";
		} else if (!phoneNumRegex.test(values.phone)) {
			errors.phone = "This is not a valid phone number";
		}
		if ("age" in values && !values.age) {
			errors.age = "Age is required";
		}
		if ("gender" in values && !values.gender) {
			errors.gender = "Gender is required";
		}
		if ("file" in values && !values.file) {
			errors.file = "File is required";
		}
		if ("message" in values && !values.message) {
			errors.message = "Message is required";
		}
		return errors;
	};
	return (
		<div className="flex flex-col items-center  min-h-screen w-screen mx-auto">
			<h2 className="text-4xl my-14 font-semibold">JSON Schema Form</h2>
			{Object.keys(formErrors).length === 0 && isSubmit ? (
				<div className="bg-green-500 text-white p-2 rounded">
					Form Submitted Successfully
				</div>
			) : isSubmit ? (
				<div className="bg-red-500 text-white p-2 rounded">
					Submission Failed!
				</div>
			) : null}
			<form className="w-80" onSubmit={submit} noValidate>
				{data.map((field, index) => (
					<div key={index} className="mb-4">
						<label className="block mb-1">{field.label}</label>
						{field.type === "text" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									maxLength={field.maxLength}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{formErrors.name}
								</p>
							</>
						) : field.type === "file" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									multiple={field.multiple}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{formErrors.file}
								</p>
							</>
						) : field.type === "email" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{formErrors.email}
								</p>
							</>
						) : field.type === "tel" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									minLength={field.minLength}
									maxLength={field.maxLength}
									pattern="[0-9]*"
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{formErrors.phone}
								</p>
							</>
						) : field.type === "number" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									min={field.min}
									max={field.max}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">{formErrors.age}</p>
							</>
						) : field.type === "select" ? (
							<>
								<select
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									className="w-full p-2 border rounded"
								>
									<option value="">Select an option</option>
									{field.options.map((option, index) => (
										<option
											key={index}
											value={option.value}
										>
											{option.label}
										</option>
									))}
								</select>
								<p className="text-red-500">
									{formErrors.gender}
								</p>
							</>
						) : field.type === "textarea" ? (
							<>
								<textarea
									name={field.name}
									rows={field.rows}
									cols={field.cols}
									className="w-full p-2 border rounded"
									value={formData[field.name] || ""}
									onChange={handleInputChange}
								/>
								<p className="text-red-500">
									{formErrors.message}
								</p>
							</>
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
