import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_GPT_KEY;

interface iRevenue {
  nomeDaReceita: string;
  modoDePreparo: string;
  origemDaReceita: string;
}

export const Revenue = () => {
  const [text, setText] = useState<string>("");
  const [revenueObject, setRevenueObject] = useState<iRevenue>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const generateImages = async ({ nomeDaReceita }: iRevenue) => {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Faça uma imagem com o nome dessa receita, " + nomeDaReceita,
    });
    setImageUrl(image.data[0].url as string);
  };

  const handleGenerateAudio = async ({ modoDePreparo }: iRevenue) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo",
      input: modoDePreparo as string,
    });

    const blob = await mp3.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "audioTeste.mp3";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleGenerateRevenue = async () => {
    const REVENUE = `Quero uma receita que eu consiga fazer com esses ingredientes '${text}', 
      preciso que me retorne a receita em formato json contendo as seguintes propriedades 'nomeDaReceita', 'modoDePreparo' e 'origemDaReceita', 
      onde nome da receita é o nome mais comum que as pessoas dão a essa receita, 
      modo de preparo é como posso fazer ela e origem da receita é de qual país ou região ela vem`;

    const completion = await openai.completions.create({
      prompt: REVENUE,
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 2000,
    });
    const jsonObject = JSON.parse(completion.choices[0].text);
    setRevenueObject(jsonObject);
    await handleGenerateAudio(jsonObject);
    await generateImages(jsonObject);
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
        <Button variant="contained" onClick={handleGenerateRevenue}>
          Generate Revenue
        </Button>
      </Box>
      {revenueObject && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          <Box sx={{ marginLeft: "30px", marginTop: "30px" }}>
            <Typography variant="h5">Nome da receita</Typography>
            <p>{revenueObject.nomeDaReceita}</p>
          </Box>
          <Box
            sx={{ marginLeft: "30px", marginTop: "30px", maxWidth: "300px" }}
          >
            <Typography variant="h5">Modo de preparo</Typography>
            <p>{revenueObject.modoDePreparo}</p>
          </Box>
          <Box sx={{ marginLeft: "30px", marginTop: "30px" }}>
            <Typography variant="h5">Origem da receita</Typography>
            <p>{revenueObject.origemDaReceita}</p>
          </Box>
        </Box>
      )}
      {imageUrl && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "300px", height: "auto" }} />
        </Box>
      )}
    </Box>
  );
};
