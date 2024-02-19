import { useState, useEffect, useRef } from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Wheel from "../src/components/Wheel/Wheel";
import NavBar from "./components/NavBar";

import FormControl from "@mui/material/FormControl";
import ListSelection from "./components/ListSelection/ListSelection";

function App() {
  const wheelRef = useRef();
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (segments.length) redrawWheel(segments);
  }, [segments]);

  const spin = () => {
    wheelRef.current.spin();
  };
  const redrawWheel = (newSegments) => {
    wheelRef.current.redraw(newSegments);
  };

  const onFinished = (winner) => {
    //console.log(winner);
  };

  return (
    <>
      <NavBar></NavBar>
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} sm={7}>
          <Wheel
            ref={wheelRef}
            segments={segments}
            onFinished={(winner) => onFinished(winner)}
            isOnlyOnce={false}
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
              <ListSelection
                fillSegments={(segments) => {
                  setSegments(() => [...segments]);
                }}
              ></ListSelection>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
