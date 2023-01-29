import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import "../css/Images.css";

const Images = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    console.log("Starting to load data");
    var ret = await fetch("http://localhost:8080/docs")
      .then((response) => {
        console.log("Inside response");
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("Inside data");
        return data.data;
      })
      .catch((err) => console.log("Error is " + err));
    console.log("Get API response " + ret);

    setData(ret);
    // modifyData(ret);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
  }, [data]);

  if (isLoading) return <Spinner animation="grow" />;
  return (
    <div className="full-body">
      {data.length > 0 &&
        data.map((item, index) => {
          if (!item.title.includes(".jpg") && !item.title.includes(".png"))
            return <></>;
          const src = "data:image/jpeg;base64," + item.doc;
          return (
            <div key={index} className="individual-file">
              <img
                src={src}
                // style={{ margin: "10px", height: "100px", width: "100px" }}
                className="img-obj"
              />
            </div>
          );
        })}
    </div>
  );
};

export default Images;
