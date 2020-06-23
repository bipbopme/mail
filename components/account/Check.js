import React from "react";
import { useAuth } from "../providers/Auth";

function AccountCheck({ authenticatedComponent, unauthenticatedComponent }) {
  const auth = useAuth();

  return auth.authToken ? authenticatedComponent : unauthenticatedComponent;
}

export default AccountCheck;
