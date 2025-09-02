import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {
  const params = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    return () => {};
  }, []);

  return <div>Payment</div>;
}

export default Payment;
