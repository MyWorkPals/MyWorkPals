import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Announcements() {
  const onClick = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Announcements
      </Typography>
      <Typography component="p" variant="h5">
        1. Off in lieu on 16 Jan 2022
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={onClick}>
          View all announcements
        </Link>
      </div>
    </>
  );
}

export default Announcements;
