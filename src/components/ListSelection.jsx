import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

export default function CheckboxListSecondary() {
  const [list, setList] = useState([
    { avatar: null, name: "Rising Sun", checked: false },
    { avatar: null, name: "Blood Rage", checked: false },
  ]);

  useEffect(() => {
    var req = new XMLHttpRequest();
    req.open(
      "GET",
      "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=013",
      false
    );
    req.send(null);
    console.log(req.responseText);
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = list.indexOf(value);
    const newList = [...list];

    newList[currentIndex].checked = !newList[currentIndex].checked;
    setList(newList);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {list.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={(event) => handleToggle(event.target.value)}
                checked={value.checked}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
