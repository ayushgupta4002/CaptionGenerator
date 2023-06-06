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


const clerkPubKey = "pk_test_YXNzdXJlZC1wb29kbGUtNDguY2xlcmsuYWNjb3VudHMuZGV2JA";

function App() {
  const [outputs, setOutputs] = useState([]);
  const [imageToPredict, setImageToPredict] = useState("");


  return (
    <div>
         <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
      <Navbar bg="dark" variant="dark" style={{ display: "flex", justifyContent:"space-between"}}>
        <Navbar.Brand >
          <MdOutlineImageSearch style={{
            marginLeft: "12px",
            marginRight: "8px"
          }} />
          Image Recognition App
        </Navbar.Brand>
        <div style={{display:"flex", padding:"0 20px" }} >
        <Example/>
        <UserButton />
        </div>
      </Navbar>

      <Container>
        <div className="mt-3" />
        <Stack gap={2}>
          <InputImage setOutputs={setOutputs} setImageToPredict={setImageToPredict} />
          <Output outputs={outputs} imageToPredict={imageToPredict} />
        </Stack>
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