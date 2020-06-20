import React from "react";
import UserAvatar from "react-native-user-avatar";

function Avatar({ name }) {
  return (
    <UserAvatar
      size={38}
      style={{ height: 36, width: 36 }}
      name={name}
      bgColors={["#3366FF", "#DF4DD9", "#FF54A0", "#FF896E", "#FFC455", "#F9F871"]}
    />
  );
}

export default Avatar;