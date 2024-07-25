import { Box, Button, TextField } from "@mui/material";
import OpenAI from "openai";
import { useState } from "react";

const apiKey = import.meta.env.VITE_API_GPT_KEY;

export const GenerateVoice = () => {
  const [text, setText] = useState<string>("");
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const handleGenerateAudio = async () => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: text,
    });

    const blob = await mp3.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'audioTeste.mp3';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ marginTop: "100px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <TextField
          id="standard-basic"
          label="Escreva aqui"
          variant="standard"
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button variant="contained" onClick={handleGenerateAudio}>
          Generate
        </Button>
      </Box>
    </Box>
  );
};
