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

const inputOptions = [
  {
    name: "Image URL",
    value: "imageURL",
  },
  {
    name: "Upload Image",
    value: "uploadImage",
  },
];

export default function InputImage(props) {
  const { setOutputs, setImageToPredict } = props;
  const [inputOption, setInputOption] = useState("imageURL");


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
      .post("/predict", {
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
      .post("/predict/upload", formData)
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
    <Stack gap={3}>
      <ButtonGroup>
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
            >
              {io.name}
            </ToggleButton>
          );
        })}
      </ButtonGroup>

      {inputOption === "imageURL" ? (
        <div>
          <FormControl
            className="mb-3"
            value={imageUrl}
            placeholder="Image URL"
            aria-label="Image URL"
            onChange={handleChangeImageUrl}
          />
          <Button variant="primary" onClick={predictImage}>
            Submit
          </Button>
        </div>
      ) : (
        <div>
          <Form.Group controlId="file" className="mb-3">
            <Form.Control
              type="file"
              onChange={handleFileFormControlOnChange}
            />
          </Form.Group>
          <Button onClick={predictImageViaUpload}>Submit</Button>
        </div>
      )}
    </Stack>
  );
}
