import React, { useContext } from "react";
import { AuthContext } from "../../utility/AuthProvider";
const Dashboard = () => {
  const {user}= useContext(AuthContext);
  return (
    <div>
      <img
        src="https://i.ibb.co/hCdd7nd/flat-isometric-vector-design-68094-97-removebg-preview.png"
        className="d-block mx-auto img-fluid mt-5"
        alt=""
      />
      <h1 className="text-center mt-5">Welcome to {user?.displayName} Dashboard</h1>
    </div>
    
  );
};

export default Dashboard;
