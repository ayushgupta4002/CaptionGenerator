import React from 'react'
import { Table, Row, Col } from "react-bootstrap";

export default function Output(props) {
    const { outputs = [], imageToPredict } = props;


    return (
        <Row className="mt-3">
            <Col>
                <div className="mb-3 row justify-content-center align-items-flex-start">
                    {imageToPredict ? <img src={imageToPredict} style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "auto"
                    }} alt="img-to-predict"
                    /> : <div>
                        Image to predict will be shown here
                    </div>}
                </div>
            </Col>
            <Col lg={8} md={6} sm={12} xs={12}>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Label</th>
                            <th>Probability</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            outputs.map((o, i) => {
                            return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.name}</td>
                                <td>{o.value}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}