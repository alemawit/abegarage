// import React from "react";
// import { Button, Card } from "react-bootstrap";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
// function DetailCard({ data, type, onClear }) {
//   return (
//     <div>
//       <Card style={{borderRadius:"10px"}} className="my-3">
//         <Card.Body>
//           <div className="d-flex justify-content-between">
//             <div className="">
//               {type === "customer" ? (
//                 <div className="">
//                   <h2 className="section-title">
//                     {" "}
//                     {data?.customer_first_name} {data?.customer_last_name}
//                   </h2>
//                   <div>
//                     <span className="info-label">Email </span>
//                     <span className="info-value">:{data?.customer_email}</span>
//                   </div>

//                   <div>
//                     <span className="info-label">Phone Number </span>
//                     <span className="info-value">
//                       :{data?.customer_phone_number}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="info-label">Active Customer </span>
//                     <span className="info-value">
//                       :{data?.active_customer_status ? "Yes" : "No"}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="info-label">Edit Customer Info</span>:
//                     <button onClick="" className="">
//                       <FontAwesomeIcon color="red" icon={faEdit} />
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="">
//                   <h2 className="section-title"> {data?.vehicle_make}</h2>
//                   <div className="">
//                     <span className="info-label">Vehicle color </span>
//                     <span className="info-value">:{data?.vehicle_color}</span>
//                   </div>

//                   <div className="">
//                     <span className="info-label">Vehicle tag </span>
//                     <span className="info-value">:{data?.vehicle_tag}</span>
//                   </div>
//                   <div className="">
//                     <span className="info-label">Vehicle year </span>
//                     <span className="info-value">:{data?.vehicle_year}</span>
//                   </div>
//                   <div className="">
//                     <span className="info-label">Vehicle mileage </span>
//                     <span className="info-value">:{data?.vehicle_mileage}</span>
//                   </div>
//                   <div className="">
//                     <span className="info-label">Vehicle Serial </span>
//                     <span className="info-value">:{data?.vehicle_serial}</span>
//                   </div>

//                   <div className="">
//                     <span className="info-label">Edit Vehicle Info</span>
//                     <button onClick="" className="">
//                       <FontAwesomeIcon color="red" icon={faEdit} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <Button variant="link" onClick={onClear}>
//               <FontAwesomeIcon
//                 icon={faRectangleXmark}
//                 style={{ color: "red" }}
//                 size="2x"
//               />{" "}
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default DetailCard;

import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faEdit, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DetailCard({ data, type, onClear }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (type === "customer") {
      navigate(`/admin/edit-customer/${data?.customer_id}`);
    } else if (type === "vehicle") {
      navigate(`/admin/vehicles/edit/${data?.vehicle_id}`);
    }
  };

  return (
    <div>
      <Card style={{ borderRadius: "10px" }} className="my-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              {type === "customer" ? (
                <>
                  <h2 className="section-title">
                    {data?.customer_first_name} {data?.customer_last_name}
                  </h2>
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">: {data?.customer_email}</span>
                  </div>
                  <div>
                    <span className="info-label">Phone Number</span>
                    <span className="info-value">
                      : {data?.customer_phone_number}
                    </span>
                  </div>
                  <div>
                    <span className="info-label">Active Customer</span>
                    <span className="info-value">
                      : {data?.active_customer_status ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="info-label">Edit Customer Info</span>:
                    <button
                      onClick={handleEdit}
                      className="ms-2 btn btn-link p-0"
                    >
                      <FontAwesomeIcon color="red" icon={faEdit} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="section-title">{data?.vehicle_make}</h2>
                  <div>
                    <span className="info-label">Vehicle color</span>
                    <span className="info-value">: {data?.vehicle_color}</span>
                  </div>
                  <div>
                    <span className="info-label">Vehicle tag</span>
                    <span className="info-value">: {data?.vehicle_tag}</span>
                  </div>
                  <div>
                    <span className="info-label">Vehicle year</span>
                    <span className="info-value">: {data?.vehicle_year}</span>
                  </div>
                  <div>
                    <span className="info-label">Vehicle mileage</span>
                    <span className="info-value">
                      : {data?.vehicle_mileage}
                    </span>
                  </div>
                  <div>
                    <span className="info-label">Vehicle Serial</span>
                    <span className="info-value">: {data?.vehicle_serial}</span>
                  </div>
                  <div>
                    <span className="info-label">Edit Vehicle Info</span>
                    <button
                      onClick={handleEdit}
                      className="ms-2 btn btn-link p-0"
                    >
                      <FontAwesomeIcon color="red" icon={faEdit} />
                    </button>
                  </div>
                </>
              )}
            </div>
            <Button variant="link" onClick={onClear}>
              <FontAwesomeIcon
                icon={faRectangleXmark}
                style={{ color: "red" }}
                size="2x"
              />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DetailCard;
