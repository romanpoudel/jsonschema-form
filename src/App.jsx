import { useEffect, useState } from "react";
import data from "./data/data.json";

function App() {
	const initialFormData = {};

	// Populate initialFormData based on the fields in the JSON data
	data.forEach((field) => {
		initialFormData[field.name] = field.initialValue || null;
	});
	const [formData, setFormData] = useState(initialFormData);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		const field = data.find((field) => field.name === name);
		if (field && field.maxLength && value.length > field.maxLength) {
			return; // Do not update state if maxLength exceeded
		}
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		setFormErrors(validate({ ...formData, [name]: value }, false));
	};
	const submit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("formData", formData);
		// setFormErrors(validate(formData));
		const errors = validate(formData, true);
		setFormErrors(errors);
		if (Object.keys(errors).length === 0) {
			setIsSubmit(true);
		}
	};
	useEffect(() => {
		console.log("Errors", formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log("validated", formData);
		}
	}, [formErrors, formData, isSubmit]);
	const validate = (values, isSubmit = false) => {
		const errors = {};
		const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const phoneNumRegex = /^(?:\+977)?\d{10}$/;
		// const requiredFields = ['name', 'email', 'phone', 'age', 'gender', 'file', 'message'];
		const requiredFields = Object.keys(initialFormData);
		requiredFields.forEach((field) => {
			if ((isSubmit && !values[field]) || values[field] === "") {
				errors[field] = `${
					field.charAt(0).toUpperCase() + field.slice(1)
				} is required`;
			}
		});
		// Validate maxLength
		data.forEach((field) => {
			if (
				field.minLength &&
				values[field.name]?.length < field.minLength
			) {
				errors[
					field.name
				] = `${field.label} cannot be less than ${field.minLength} characters`;
			}
		});
		if (values.email !== null && !emailRegx.test(values.email)) {
			errors.email = "This is not a valid email format";
		}
		if (values.phone !== null && !phoneNumRegex.test(values.phone)) {
			errors.phone = "This is not a valid phone number";
		}
		return errors;
	};
	return (
		<div className="flex flex-col items-center  min-h-screen w-screen mx-auto">
			<h2 className="text-4xl  font-semibold">JSON Schema Form</h2>
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
									// maxLength={field.maxLength}
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
									//correction
									// minLength={field.minLength}
									// maxLength={field.maxLength}
									// pattern="[0-9]*"
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
									//correction req
									// min={field.min}
									// max={field.max}
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
