import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector } from "react-redux";
import { selectSignedIn } from "./features/userSlice";
import News from "./Components/News";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });

  const isSignedIn = useSelector(selectSignedIn);
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Navbar />
        <Homepage />
        {isSignedIn && <News />}
      </div>
    </ThemeProvider>
  );
}

export default App;
