import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import GameSelect from "./AddListItem";
import PropTypes from "prop-types";

export default function ListSelection({ fillSegments }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("list", list);
    fillSegments(list);
  }, [list]);

  console.log(list);

  const handleToggle = (value) => {
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
      <ListItem>
        <GameSelect
          updateList={(newItem) => {
            setList((state) => [
              ...state,
              {
                ...newItem,
                text: newItem.names.find((name) => name.type === "primary")
                  .value,
                checked: false,
              },
            ]);
          }}
        />
        <div></div>
      </ListItem>
      {list.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleToggle(value)}
                checked={value.checked}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={value.thumbnail} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`${
                  value.names.find((name) => name.type === "primary").value
                }`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

ListSelection.propTypes = {
  fillSegments: PropTypes.func.isRequired,
};
