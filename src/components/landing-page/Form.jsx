import React, { useState } from "react";
import formImage from "../../assets/landing-page-images/form-image.png";
import { API_ENDPOINTS } from "../../api/api";
import axios from "axios";

const Form = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        API_ENDPOINTS.CONTACT,
        {
          title: title,
          name: name,
          email: email,
          company_name: company,
          phone_number: phone,
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage("Message sent Successfully");
          setTitle("");
          setName("");
          setEmail("");
          setCompany("");
          setPhone("");
          setMessage("");
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000); 
        } else {
          setErrorMessage("An error Occurred");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000); 
        }
      })
      .catch((error) => {
        setErrorMessage("An error Occurred");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000); 
      });
  };

  return (
    <section
      id="contact"
      className="w-11/12 mx-auto flex flex-col md:flex-row gap-12 py-16"
    >
      <img className="md:w-1/3 lg:w-1/2 object-cover" src={formImage} alt="" />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-2">
          Don't Hesitate To Send Your Message To Us
        </h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="px-2 py-3 border-2 border-hoverColor rounded-lg outline-none"
          type="text"
          value={title}
          placeholder="Title"
          required
        />
        <input
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-3 border-2 border-hoverColor rounded-lg outline-none"
          type="text"
          value={name}
          placeholder="Name"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-3 border-2 border-hoverColor rounded-lg outline-none"
          type="email"
          value={email}
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setCompany(e.target.value)}
          className="px-2 py-3 border-2 border-hoverColor rounded-lg outline-none"
          type="text"
          value={company}
          placeholder="Company Name"
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          className="px-2 py-3 border-2 border-hoverColor rounded-lg outline-none"
          type="tel"
          value={phone}
          placeholder="Phone Number"
        />
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="px-2 py-3 outline-none border-2 border-hoverColor rounded-lg resize-none"
          cols="30"
          rows="4"
          value={message}
          placeholder="Message"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-mainColor text-gray-100 py-4 rounded-lg"
        >
          Submit
        </button>
        {(successMessage || errorMessage) && (
          <div
            className={`py-2 ${
              successMessage ? "bg-green-500" : "bg-red-500"
            } rounded-lg text-white text-center`}
          >
            {successMessage || errorMessage}
          </div>
        )}
      </form>
    </section>
  );
};

export default Form;
