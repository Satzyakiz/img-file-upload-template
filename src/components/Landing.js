import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import CustomButton from "./Button";
import successimg from "../assets/success-upload.jpg";

const Landing = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0].name);
    }

    useEffect(() => {
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, [showSuccess])

    const handleClick = async () => {
        setIsLoading(true);
        const body = JSON.stringify({title: file.name, file: file});
        const data = new FormData();
        data.append("title", file.name);
        data.append("file", file);
        var ret = await fetch("http://localhost:8080/docs", {
          method: "POST",
          body: data
        }).then(response => {
          console.log("Raw response is " + response);
          return response.json()})
          .then(data => {
            console.log("Data is " + data);
            return data.status})
          .catch(err => {
            console.log(err);
            return err;
          });
          console.log("Result of post request " + ret);
          setIsLoading(false);
          if(ret === "success") setShowSuccess(true);
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
      {showSuccess ? <SuccessUpload /> : <></>}
    </div>
  );
};

const SuccessUpload = () => {
  return (
    <div>
      <img src={successimg} alt="Success" />
    </div>
  )
}

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