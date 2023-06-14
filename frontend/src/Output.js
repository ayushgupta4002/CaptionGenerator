import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import "./App.css";
import PulseLoader from "react-spinners/PulseLoader";

export default function Output(props) {
  const { outputs = [], imageToPredict, loading } = props;
  var paragraph=outputs + '';
  const parts = paragraph.split(/(?=Excited:|Sad:)/);


  return (
    <Row className="mt-3">
      <Col>
        <div className="mb-3 row justify-content-center align-items-flex-start">
          {imageToPredict ? (
            <img
              src={imageToPredict}
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
              }}
              alt="img-to-predict"
            />
          ) : (
            <div>Image to predict will be shown here</div>
          )}
        </div>
      </Col>
      <Col lg={8} md={6} sm={12} xs={12}>
        <Table hover>
          <thead>
            <tr>
              <th>
                <div className="copy">
                  <div>Caption</div>
                  <button
                    className="copybutton"
                    onClick={() => {
                      navigator.clipboard.writeText(outputs);
                      document.getElementById("custom-tooltip").style.display =
                        "inline";
                      setTimeout(function () {
                        document.getElementById(
                          "custom-tooltip"
                        ).style.display = "none";
                      }, 1000);
                    }}
                  >
                    <img
                      src={require("./Assets/copymain2.png")}
                      alt=""
                      style={{ width: "20px" }}
                    />
                  </button>
                  <span id="custom-tooltip">copied!</span>
                </div>
              </th>
              {/* <th>Label</th>
                            <th>Probability</th> */}
            </tr>
          </thead>
          <tbody>


            
            {loading ? <PulseLoader color="#36d7b7" size={12} /> : <> <p>{parts[0] }</p> <p> {parts[1] }</p> <p>{parts[2]} </p></> }
            {/* { 
                            outputs.map((o, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o}</td>
                                <td>{o.value}</td>
                            </tr>
                        })} */}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
