import { Box, Button } from "@mui/material";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const SwitchPages = () => {
  const [handleNavigation, setHandleNavigation] = useState(0);
  
  const navigation = useNavigate();
  const countRoutes = routes.length;

  useEffect(() => {
    navigation(routes[handleNavigation]);
  }, [handleNavigation])

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "50%", position: "fixed", bottom: 0, left: '50%', transform: 'translateX(-50%)', marginBottom: '30px' }}>
        <Button variant="contained" onClick={() => {
            if (handleNavigation > 0) {
                setHandleNavigation(handleNavigation - 1);
            }
            }}>Voltar</Button>
        <Button variant="contained" onClick={() => {
            if (handleNavigation < countRoutes - 1) {
                setHandleNavigation(handleNavigation + 1);
            }
        }}>Próximo</Button> 
      </Box>
    </>
  );
};
