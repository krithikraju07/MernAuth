import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState(null);
  let interval; // Declare the interval variable here

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      });

      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle the error as needed
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });

      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error as needed
    }
  };

  const cleanupInterval = () => {
    clearInterval(interval);
  };

  useEffect(() => {
    interval = setInterval(async () => {
      const data = await refreshToken();
      setUser(data.user);
    }, 1000 * 28);

    return cleanupInterval;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest();
      setUser(data.user);
    };

    if (user === null) {
      fetchData();
    }
  }, [user]);

  return (
    <div style={styles.container}>
      {user && (
        <h1 style={styles.heading}>Welcome, {user.name}!</h1>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: "#007BFF", // Updated background color
    padding: "20px",
    borderRadius: "10px", // Optional: Add border-radius for a rounded look
  },
  heading: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Welcome;
