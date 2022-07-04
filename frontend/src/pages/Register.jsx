import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import nasti from "../images/nasti.jpg";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const toEmployeeRegister = () => {
    navigate("/register/employee");
  };

  const toManagerRegister = () => {
    navigate("/register/manager");
  };

  return (
    <>
      <h1>Register</h1>
      <Stack direction={"row"} spacing={2}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={toManagerRegister}>
            <CardMedia
              component="img"
              height="140"
              image={nasti}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sign up as Manager
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={toEmployeeRegister}>
            <CardMedia
              component="img"
              height="140"
              image={nasti}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sign up as Employee
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
}

export default Register;
