import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/api";
import axios from "axios";

const Field = ({ label, content }) => {
  return (
    <section className="mt-4">
      <p className="text-sm">{label}</p>
      <p className="w-full border border-buttonHoverColor rounded-lg py-2 px-3">
        {content}
      </p>
    </section>
  );
};

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packageDuration, setPackageDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const getUserData = async (token) => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_USER_DATA, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
      setPhone(response.data.phone_number);
      setPackageName(response.data.subscriptions[0].package_details.name);
      setPackageDuration(
        response.data.subscriptions[0].package_details.duration_days
      );
      setStartDate(response.data.subscriptions[0].start_date.split("T")[0]);
      setEndDate(response.data.subscriptions[0].end_date.split("T")[0]);
      setLoading(false);
    } catch (error) {
      const response = await axios.get(API_ENDPOINTS.GET_CURRENT_USER, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        setUsername(response.data.user_name);
        setEmail(response.data.email);
      } else {
        setErr(error.response.data.error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserData(token);
    } else {
      navigate("/")
    }

  }, []);

  return (
    <section className="w-full h-[88vh] pt-12 bg-gray-50 text-gray-700">
      {loading ? (
        <div className="w-8 h-8 border-2 border-r-transparent border-mainColor rounded-full mx-auto my-48 animate-spin"></div>
      ) : (
        <section className="w-full sm:w-3/4 md:w-1/2 mx-auto py-24 px-6 sm:px-12 rounded-lg sm:shadow-lg sm:bg-white">
          <h1 className="text-2xl font-bold">User Data</h1>
          <Field label="Name" content={username} />
          <Field label="Email" content={email} />
          {phone ? <Field label="Phone Number" content={phone} /> : null}
          {packageName ? (
            <>
              <h1 className="text-2xl font-bold mt-4 mb-2">
                User Package details
              </h1>
              <p>Package Name: {packageName}</p>
              <p>Duration Days: {packageDuration}</p>
              <p>Start date: {startDate}</p>
              <p>End data: {endDate}</p>
            </>
          ) : null}
        </section>
      )}
      {err ? <p>{err}</p> : null}
    </section>
  );
};

export default Profile;
