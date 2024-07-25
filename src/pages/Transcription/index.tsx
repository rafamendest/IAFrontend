import { Box, Button } from "@mui/material";
const apiKey = import.meta.env.VITE_API_GPT_KEY;
import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";
import { useState } from "react";

export const Transcription = () => {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const [audioText, setAudioText] = useState<string>();
  const [file, setFile] = useState<Uploadable>();

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const generateAndPlayAudio = async () => {
    const transcription = await openai.audio.transcriptions.create({
      file: file as Uploadable,
      model: "whisper-1",
    });

    console.log(transcription);
    setAudioText(transcription.text);
  };

  return (
    <Box sx={{ marginTop: "100px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button variant="contained" onClick={generateAndPlayAudio}>
          Transcription
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <p>{audioText}</p>
      </Box>
      
    </Box>
  );
};
