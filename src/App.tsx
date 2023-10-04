import React, { useState } from "react";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

import CurrencySelect from "./CurrenceSelect";
import CurrencyRow from "./CurrencyRow";

import "./App.css";

function App() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const onClick = () => setIsButtonClicked(true);

  return (
    <div
      className={css`
        padding: 30px;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: hotpink;
      `}
    >
      <h1>Converter</h1>
      <CurrencyRow />
      <Button variant="contained" onClick={onClick}>
        Add currency
      </Button>
      {isButtonClicked && (
        <CurrencySelect
          isButtonClicked={isButtonClicked}
          setIsButtonClicked={setIsButtonClicked}
        />
      )}
    </div>
  );
}

export default App;
