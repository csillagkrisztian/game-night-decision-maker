import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  parseBggXmlApi2SearchResponse,
  parseBggXmlApi2ThingResponse,
} from "@code-bucket/board-game-geek";
import { sortResults } from "./helpers/";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

export default function GameSelect({ updateList }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    async function fetchBGGData() {
      setLoading(true);
      const formattedQuery = query.replace(" ", "+");
      const { data } = await axios.get(
        `https://api.geekdo.com/xmlapi2/search?query=${formattedQuery}&type=boardgame`
      );
      const bggResponse = parseBggXmlApi2SearchResponse(data).items;
      const sortedResponse = sortResults(bggResponse, "rising sun");
      const enrichedData = await fetchAdditionalData(sortedResponse);
      setResults(enrichedData);
      setLoading(false);
    }

    async function fetchAdditionalData(list) {
      const bggIds = list.map((result) => result.id);
      const { data } = await axios.get(
        `https://api.geekdo.com/xmlapi2/thing?id=${bggIds.join(
          ","
        )}&versions=1&stats=1&type=boardgame`
      );
      return parseBggXmlApi2ThingResponse(data)?.items;
    }

    if (debounceTimeoutRef.current && query !== "") {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchBGGData();
    }, 500);
  }, [query]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={results || []}
      value={selectedValue}
      onChange={(event, newValue) => {
        updateList(newValue);
        setSelectedValue(null);
      }}
      autoComplete
      autoHighlight
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
      getOptionLabel={(option) => {
        return option.names.find((name) => name.type === "primary").value;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img loading="lazy" width="20" src={option.thumbnail} alt="" />
          {option.names.find((name) => name.type === "primary").value}
        </Box>
      )}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a game"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

GameSelect.propTypes = {
  updateList: PropTypes.array.isRequired,
};
