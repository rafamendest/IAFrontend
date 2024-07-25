import { Box, Button, TextField } from "@mui/material";
import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";
import { useState } from "react";

const apiKey = import.meta.env.VITE_API_GPT_KEY;
export const ImagesModify = () => {
  const [text, setText] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoad, setImageLoad] = useState<Uploadable>();
  const [imageUrl2, setImageUrl2] = useState<string | null>(null);

  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const handleText = (event: any) => {
    setText(event.target.value);
  };

  const handleText2 = (event: any) => {
    setText2(event.target.value);
  };

  const generateImages = async () => {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: text,
    });
    setImageUrl(image.data[0].url as string);
  };

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];
    setImageLoad(file);
  };
  
  const modifyImage = async () => {
    const image = await openai.images.edit({
        image: imageLoad as Uploadable,
        prompt: text2,
      });
    
      setImageUrl2(image.data[0].url as string);
  };


  return (
    <Box sx={{ marginTop: "100px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <TextField id="standard-basic" label="Prompt" variant="standard" onChange={handleText}/>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button variant="contained" onClick={generateImages}>
          Gerar imagem
        </Button>
      </Box>
      {imageUrl && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "300px", height: "auto" }} />
        </Box>
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <input type="file" accept="image/*" onChange={handleChangeImage}/>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <TextField id="standard-basic" label="Modifique aqui" variant="standard" onChange={handleText2}/>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button variant="contained" onClick={modifyImage}>
          Modificar Imagem
        </Button>
      </Box>
      {imageUrl2 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <img src={imageUrl2} alt="Generated" style={{ maxWidth: "400px", height: "auto" }} />
        </Box>
      )}
    </Box>
  );
};
