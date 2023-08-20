import { useEffect, useState } from "react";
import data from "./data/data.json";

const App1 = () => {
	const initialFormData = {};

	// Populate initialFormData based on the fields in the JSON data
	data.forEach((field) => {
		initialFormData[field.name] = field.initialValue || null;
	});
	//states
	const [formData, setFormData] = useState(initialFormData);
	const [focusedInput, setFocusedInput] = useState(null);
	const [fields, setFields] = useState({});
	// const [formErrors, setFormErrors] = useState({});
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		console.log("Submitted");
		alert("Form Submitted");
		setFormData(initialFormData);
	};
	const validation = (fieldName) => {
		const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const phoneNumRegex = /^(?:\+977)?\d{10}$/;
		data.map((field) => {
			if (field.name === fieldName) {
				if (!formData[fieldName] || formData[fieldName] === "") {
					setFields((prev) => ({
						...prev,
						[fieldName]: {
							validated: false,
							message: "Can't be empty",
						},
					}));
				} else {
					setFields((prev) => ({
						...prev,
						[fieldName]: { validated: true, message: "validated" },
					}));
				}
				//for pattern checking
				if (
					formData.email !== null &&
					!emailRegx.test(formData.email)
				) {
					setFields((prev) => ({
						...prev,
						[fieldName]: {
							validated: false,
							message: "This is not a valid email",
						},
					}));
				}
				if (
					formData.phone !== null &&
					!phoneNumRegex.test(formData.phone)
				) {
					setFields((prev) => ({
						...prev,
						[fieldName]: {
							validated: false,
							message: "This is not a valid phone number",
						},
					}));
				}
				//for maxLength
				if (
					field.maxLength &&
					formData[fieldName]?.length > field.maxLength
				) {
					setFields((prev) => ({
						...prev,
						[fieldName]: {
							validated: false,
							message: "Length greater than maxLength",
						},
					}));
				}
				//for minLength
				if (
					field.minLength &&
					formData[fieldName]?.length < field.minLength
				) {
					setFields((prev) => ({
						...prev,
						[fieldName]: {
							validated: false,
							message: "Length less than minLength",
						},
					}));
				}
			}
		});
	};
	const handleBlur = (fieldName) => {
		setFocusedInput(fieldName);
		validation(fieldName);
	};
	const handleFocus = (fieldName) => {
		setFields((prev) => ({
			...prev,
			[fieldName]: { validated: false },
		}));
	};

	useEffect(() => {
		console.log(focusedInput);

		console.log(fields);
		// console.log(formErrors);
	}, [focusedInput, fields]);

	const checkRequired = () => {
		return data.some((field) => {
			let isFieldEmpty;
			if (field.required) {
				if (
					formData[field.name] === null ||
					formData[field.name] === ""
				) {
					isFieldEmpty = true;
				} else {
					isFieldEmpty = false;
				}
			}
			return isFieldEmpty;
		});
	};

	return (
		<div className="flex flex-col items-center  min-h-screen w-screen mx-auto">
			<h2 className="text-4xl  font-semibold">JSON Schema Form</h2>

			<form className="w-80" onSubmit={handleSubmit} noValidate>
				{data.map((field, index) => (
					<div key={index} className="mb-4">
						<label className="block mb-1">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
						{field.type === "text" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									onBlur={() => handleBlur(field.name)}
									onFocus={() => handleFocus(field.name)}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
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
									onBlur={() => handleBlur(field.name)}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
								</p>
							</>
						) : field.type === "email" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									onBlur={() => handleBlur(field.name)}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
								</p>
							</>
						) : field.type === "tel" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									onBlur={() => handleBlur(field.name)}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
								</p>
							</>
						) : field.type === "number" ? (
							<>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									onBlur={() => handleBlur(field.name)}
									className="w-full p-2 border rounded"
								/>
								<p className="text-red-500">
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
								</p>
							</>
						) : field.type === "select" ? (
							<>
								<select
									name={field.name}
									value={formData[field.name] || ""}
									onChange={handleInputChange}
									onBlur={() => handleBlur(field.name)}
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
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
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
									onBlur={() => handleBlur(field.name)}
								/>
								<p className="text-red-500">
									{!fields[field.name]?.validated &&
										fields[field.name]?.message}
								</p>
							</>
						) : null}
					</div>
				))}
				<p className="mb-2 text-center">
					Note: Fill all required <span className="text-red-500">*</span> fields to Submit
				</p>
				<button
					type="submit"
					className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					disabled={checkRequired()}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default App1;
