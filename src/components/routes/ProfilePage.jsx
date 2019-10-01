import React from "react";

const ProfilePage = props => {
  return (
    <>
      <div class="container mt-5">Hello {props.user}</div>
    </>
  );
};

export default ProfilePage;
