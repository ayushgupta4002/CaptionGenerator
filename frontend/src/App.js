import { useState } from "react";
import { Container, Stack, Navbar } from "react-bootstrap";
import { MdOutlineImageSearch } from "react-icons/md";


import InputImage from "./InputImage";
import Output from "./Output";


import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/clerk-react";
import Example from "./Example";
import NavbarIr from "./NavbarIr";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const clerkPubKey = "pk_test_YXNzdXJlZC1wb29kbGUtNDguY2xlcmsuYWNjb3VudHMuZGV2JA";

function App() {

  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 50px 10px 46px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 5px auto;
  border-radius: 10px;
`;
  const [outputs, setOutputs] = useState([]);
  const [imageToPredict, setImageToPredict] = useState("");


  return (
    <div>
         <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <NavbarIr />
      <Container>
        <div className="mt-3" />
        <Stack gap={2}>
        <Typography
            variant="h1"
            noWrap
            sx={{
              mt:5,
              display: 'flex',
              justifyContent: "center",
              // fontFamily: 'monospace',
              fontSize: "26px",
              fontWeight: 900,
              // color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Caption Generator
          </Typography>
        <Typography
            variant="h6"
            noWrap
            sx={{
              mb:5,
              display: 'flex',
              justifyContent: "center",
              // fontFamily: 'monospace',
              // color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Generate captions and hashtags for your image automatically.
          </Typography>

        </Stack>
          {/* <Button   sx={{
            fontSize: "26px",
            fontWeight: 900,
            display: 'flex',
            justifyContent: "center",
            }}>
            <FileUploadIcon sx={{margin: 0.5 }} />
  Upload
</Button> */}
          <InputImage setOutputs={setOutputs} setImageToPredict={setImageToPredict} />
          <Output outputs={outputs} imageToPredict={imageToPredict} />
      </Container>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
    </div>

  );
}

export default App;