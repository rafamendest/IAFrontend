import "./App.css";
import { SwitchPages } from "./components/SwitchPages";
import { Transcription } from "./pages/Transcription";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ImagesModify } from "./pages/ImagesModify";
import { routes } from "./routes";
import { Box } from "@mui/material";
import { GenerateVoice } from "./pages/GenerateVoice";
import { Revenue } from "./pages/Revenue";


function App() {
  return (
    <Box className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Transcription />} path={routes[0]} />
          <Route element={<ImagesModify />} path={routes[1]} />
          <Route element={<GenerateVoice />} path={routes[2]} />
          <Route element={<Revenue />} path={routes[3]} />
        </Routes>
        <SwitchPages />
      </BrowserRouter>
    </Box>
  );
}

export default App;
