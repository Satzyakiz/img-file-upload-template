import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import CustomButton from "./Button";

const Landing = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const handleClick = () => {
        console.log("Clicked");
    }
  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" onChange={handleFileInput} />
      </Form.Group>
      <CustomButton
        isLoading={isLoading}
        variant="dark"
        btnText="Upload"
        style={styles.btnStyle}
        btnDivStyle={styles.btnDivStyle}
        onClick={handleClick}
      />
    </div>
  );
};

export default Landing;


const styles = {
  inputField: {
    marginBottom: "5px",
  },
  inputDivStyle: {
    justifyContent: "center",
    width: "60vw",
  },
  btnStyle: {
    background: "green",
    width: "30%",
    margin: "10px",
  },
  btnDivStyle: {
    display: "flex",
    justifyContent: "center",
  },
};