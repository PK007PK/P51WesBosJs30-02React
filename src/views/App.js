import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import AppProvider from '../AppContext';
import Layout from 'components/Layout';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'assets/Theme';

const StyledClock = styled.div`
  width: 30rem;
  height: 30rem;
  border: 20px solid white;
  border-radius: 50%;
  margin: 51px auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), inset 0 0 0 3px #efefef,
    inset 0 0 10px black, 0 0 10px rgba(0, 0, 0, 0.2);

  .clock-face {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateY(-3px);
  }

  .hand {
    width: 50%;
    height: 3px;
    background: black;
    position: absolute;
    top: 50%;
    transform-origin: 100%;
    transform: rotate(90deg);
    transition: all 0.05s;
    transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
  }
`;

function App() {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [hours, setHours] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(new Date().getSeconds());
      setMinutes(new Date().getMinutes());
      setHours(new Date().getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <StyledClock>
            <div className="clock-face">
              <div
                style={{ transform: `rotate(${(seconds % 60) * 6 + 90}deg)` }}
                className="hand second-hand"
              ></div>
              <div
                style={{ transform: `rotate(${(minutes % 60) * 6 + 90}deg)` }}
                className="hand min-hand"
              ></div>
              <div
                style={{ transform: `rotate(${(hours % 12) * 30 + 90}deg)` }}
                className="hand hour-hand"
              ></div>
            </div>
          </StyledClock>
        </Layout>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
