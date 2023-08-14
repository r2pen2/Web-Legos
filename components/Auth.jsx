import { useEffect } from "react";

import { AuthenticationManager } from "../api/auth.ts";
import { signOut } from "firebase/auth";
import { Button } from "@nextui-org/react";

/**
 * @param {AuthenticationManager} authManager - AuthenticationManager instance for this site
 * @param {FirebaseAuthentication} currentSignIn - currently signed in user state  
 * @param {Function} setCurrentSignIn - currently signed in user state setter function  
 */
export function FooterAuthButton({authManager, currentSignIn, setCurrentSignIn}) {
  
  // Update sign-in state on authentication change
  useEffect(() => {
    authManager.auth.onAuthStateChanged(u => {
      setCurrentSignIn(u);
    })
  }, [authManager, setCurrentSignIn])

  function handleSignInClick() {
    if (authManager.auth.currentUser) {
      setCurrentSignIn(null);
      signOut(authManager.auth).then(() => {
        window.location.reload();
      });
    } else {
      authManager.signInWithGoogle().then(authUser => {
        setCurrentSignIn(authUser);
        if (authUser) {
          const uid = authUser.uid;
          const displayName = authUser.displayName;
          authManager.createNewUser(uid, displayName);
        }
      }).catch((err) => {
        console.warn(err);
        setCurrentSignIn(null);
      });
    }
  }  

  return (
    <Button light onClick={handleSignInClick}>
      {currentSignIn ? `Signed in as ${currentSignIn.displayName}` : "Admin Login"}
    </Button>
  )
}