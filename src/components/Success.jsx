import React from "react";
import {  Result } from "antd";

const Success = ({ itemId, description }) => {
  return (
    <div>
        <Result
          status="success"
          title={
              itemId === undefined
              ? "Successfully Added new menu"
              : "Successfully Updated menu"
          }
          subTitle={`Item: ${description}`}
        />
    </div>
  );
};

export default Success;
