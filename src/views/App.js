import React, { createRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import AppProvider, { AppContext } from '../AppContext';
import Layout from 'components/Layout';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'assets/Theme';

const StyledClock = styled.div`
  width: 30rem;
  height: 30rem;
  border: 20px solid white;
  border-radius: 50%;
  margin: 50px auto;
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
  const secondHandRef = createRef();

  function setDate() {
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

  useEffect(() => {
    const interval = setInterval(() => setDate(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <StyledClock>
            <div class="clock-face">
              <div ref={secondHandRef} class="hand hour-hand"></div>
              <div class="hand min-hand"></div>
              <div class="hand second-hand"></div>
            </div>
          </StyledClock>
        </Layout>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
