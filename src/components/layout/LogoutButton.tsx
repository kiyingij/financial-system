"use client";

import {signOut} from "next-auth/react";
import {Button} from "primereact/button";

/** 
 * Logout the current user
*/
export default function LogoutButton() {
  return (
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      severity="danger"
      onClick={() => 
        signOut({
            callbackUrl: "/login", //Redirect to login page after logout
        })
    }
    />
  );
}