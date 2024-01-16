import { useState } from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Wheel from "react-decision-wheel";
import NavBar from "./components/NavBar";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListSelection from "./components/ListSelection";

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("");

  const handleChange = (event) => {
    setColor(event.target.value);
  };
  const segments = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];

  const onFinished = (winner) => {
    //console.log(winner);
  };

  return (
    <>
      <NavBar></NavBar>
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} sm={7}>
          <Wheel
            segments={segments}
            segColors={segColors}
            onFinished={onFinished}
            upDuration={1}
            isOnlyOnce={false}
            downDuration={800}
            canvasStyle={{ margin: "2rem", marginTop: "5rem" }}
          ></Wheel>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ width: "100%", height: "100%" }}
          >
            <FormControl>
              <ListSelection></ListSelection>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
