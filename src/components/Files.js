import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../css/Files.css";

const Files = () => {
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

  useEffect(() => {}, [data]);

  if (isLoading) return <Spinner animation="grow" />;
  return (
    <div className="full-body">
      {data.length > 0 &&
        data.map((item, index) => {
          if (!item.title.includes(".pdf")) return <></>;

          const linkSource = `data:application/pdf;base64,${item.doc}`;
          const downloadName = `${item.title}`;
        return (
          <div className="individual-file">
            <embed src={linkSource} className="embed-obj" />
          </div>
        );
        })}
    </div>
  );
};

export default Files;
