import { useUser } from "@clerk/clerk-react";

export default function Example() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return <div style={{color:"white", padding:"0 30px" }}>Hello, {user.firstName} welcome to Clerk</div>;
}