import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import UserContext from 'src/context/UserContext';
import IterationsContext from 'src/context/IterationsContext';
import { useContext, useEffect, useState } from 'react';
import Axios from "axios";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [ userData, setUserData ] = useState(UserContext);
  const [ iterations, setIterations ] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:5000/iterations/').then(res => {
        console.log(res.data);
        setIterations(res.data);
        // setIterations(res.data);
    }).catch(err => {
        console.log(err);
    });
}, []);
  const checkLoggedIn = async () => {
    const token = localStorage.getItem("auth-token");
    if (token == null) {
      localStorage.setItem("auth-token", "");
      //token = "";
    }
    const tokenRes = await Axios.post(
      "http://localhost:5000/auth/token",
      null,
      { headers: { "x-auth-token": token } }
    );
    //console.log(tokenRes);
    if (tokenRes.data) {
      //console.log(tokenRes.data.id);
      const userRes = await Axios.get(
        `http://localhost:5000/users/${tokenRes.data.id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      //console.log(userData);
      setUserData({
        token,
        user: userRes.data,
      });
      setAuth(true)
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <UserContext.Provider value={{userData, setUserData}}>
        <IterationsContext.Provider value={{iterations, setIterations}}>
          <Head>
            <title>
              Athena
            </title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </IterationsContext.Provider>
      </UserContext.Provider>
    </CacheProvider>
  );
};

export default App;
