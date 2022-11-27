import React, { useState, useEffect } from "react";
import { UrlTable } from "./url-table/UrlTable";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import AddCircle from "@mui/icons-material/AddCircle";
import Edit from "@mui/icons-material/Edit";
import { Url } from "./shared/types";
 
export const App = () => {
  const [currentUrlId, setCurrentUrlId] = useState(0);
  const [urls, setUrls] = useState<Url[]>([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentUrlAlias, setCurrentUrlAlias] = useState("");

  const addUrl = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs: any) => {
      setUrls([...urls, { id: currentUrlId, alias: currentUrlAlias, url: tabs[0].url }]);
      setCurrentUrlAlias("");
    });
  };
  const deleteUrl = (id: number) => setUrls(urls.filter((url) => url.id != id));
  const getFilteredUrls = () => {
    if (currentFilter == "") {
      return urls;
    }

    return urls.filter(url => url.alias.includes(currentFilter) || url.url.includes(currentFilter));
  };

  useEffect(() => {
    const storedUrls = localStorage.getItem("stored_urls");

    if (storedUrls) {
      setUrls(JSON.parse(storedUrls));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stored_urls", JSON.stringify(urls));

    if (urls.length != 0) {
      setCurrentUrlId(urls[urls.length - 1].id + 1);
    }
  }, [urls]);

  // 

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <TextField
        sx={{ width: 700, mt: 2 }}
        label="Search URL"
        InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} color="primary" /> }}
        variant="outlined"
        color="primary"
        value={currentFilter}
        onChange={(event: any) => setCurrentFilter(event.target.value)}
        focused
      />
      
      <UrlTable urls={getFilteredUrls()} deleteUrl={deleteUrl} />

      <Box sx={{ display: "flex", alignItems: "center", mt: 2.5 }}>
        <TextField
          sx={{ width: 440 }}
          label="URL Alias"
          InputProps={{ startAdornment: <Edit sx={{ mr: 1 }} color="primary" /> }}
          variant="outlined"
          color="primary"
          value={currentUrlAlias}
          onChange={(event: any) => setCurrentUrlAlias(event.target.value)}
          focused
        />

        <Button
          sx={{ width: 250, ml: 1.3, height: 54 }}
          variant="contained" 
          startIcon={<AddCircle sx={{ color: "#FFFFFF" }} />}
          color="primary"
          onClick={addUrl}
        >Add current URL</Button>
      </Box>
    </Box>
  );
};
