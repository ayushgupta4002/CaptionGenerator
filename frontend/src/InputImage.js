import React, { useState } from "react";
import axios from "axios";

import {
  FormControl,
  Button,
  ButtonGroup,
  Form,
  Stack,
  ToggleButton,
} from "react-bootstrap";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const inputOptions = [
  {
    name: "Upload Image",
    value: "uploadImage",
  },
  {
    name: "Image URL",
    value: "imageURL",
  },
];

export default function InputImage(props) {
  const { setOutputs, setImageToPredict } = props;
  const [inputOption, setInputOption] = useState("uploadImage");

  const ToggleButton = styled.button`
  background-color: black;
  color: white;
  font-size: 18px;
  padding: 10px 44px 10px 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: auto;
  border-radius: 10px;
`;

  const [imageUrl, setImageUrl] = useState(
    "https://samples.clarifai.com/dog2.jpeg"
  );

  const [fileObj, setFileObj] = useState(null);


  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
 


  const predictImage = () => {
    setOutputs([]);
    setImageToPredict(imageUrl);
    axios
      .post("https://caption-generator-three.vercel.app/predict", {
        imageUrl: imageUrl,
      })
      .then((res) => {
        setOutputs(res.data.caption);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const predictImageViaUpload = () => {
    setOutputs([]);
    const formData = new FormData();
    formData.append("file", fileObj);
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setImageToPredict(reader.result);
    });

    if (fileObj) {
      reader.readAsDataURL(fileObj);
    }

    axios
      .post("https://caption-generator-three.vercel.app/predict/upload", formData)
      .then((res) => {
        console.log(res.data.caption);
        setOutputs(res.data.caption);

      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFileFormControlOnChange = (e) => {
    if (e.target.files.length) {
      setFileObj(e.target.files[0]);
    }
  };

  return (
    <>
    <Stack gap={3} style={{marginBottom:"2rem"}}>
    <ButtonGroup >
        {inputOptions.map((io) => {
          return (
            <ToggleButton
              key={io.value}
              checked={inputOption === io.value}
              value={io.value}
              type="radio"
              variant={
                inputOption === io.value
                ? "outline-primary"
                  : "outline-secondary"
              }
              onClick={(e) => {
                setInputOption(io.value);
              }}
              sx={{
                backgroundColor: inputOption === 'imageURL' ? 'white' : 'black',
                color:  inputOption === io.value === 0 ? 'black' : 'white',
                '&:hover': {
                  backgroundColor: inputOption === io.value=== 0 ? 'white' : 'black',
                  color: inputOption === io.value === 0 ? 'black' : 'white',
                },
              }}
            >
              {io.name}
            </ToggleButton>
          );
        })}
      </ButtonGroup>
</Stack>
<Stack gap={6}  >

      {inputOption === "imageURL" ? (
        <div>
          <FormControl
            className="mb-3"
            value={imageUrl}
            placeholder="Image URL"
            aria-label="Image URL"
            onChange={handleChangeImageUrl}
            sx={{display: 'flex', justifyContent:"center", margin: "auto",  width: '50%' }}
            />
          <Button variant="primary" onClick={predictImage} style={{  backgroundColor: "black",
  color: "white"}}>
            Submit
          </Button>
        </div>
      ) : (
        <div >
          <Form.Group controlId="file" className="">
            <Form.Control
              type="file"
              onChange={handleFileFormControlOnChange}
            />
          </Form.Group>
          <Typography variant="subtitle1" sx={{
        color: 'grey'
      }}>Supports jpeg, jpg, png... </Typography>
          <Button onClick={predictImageViaUpload} style={{ marginTop:"7px", backgroundColor: "black",
  color: "white"}}>Submit</Button>
        </div>
      )}
      </Stack>
    </>
  );
}
