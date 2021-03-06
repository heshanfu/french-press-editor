import "typeface-rajdhani"
import "typeface-yanone-kaffeesatz"

import {BrowserRouter} from "react-router-dom"
import {ThemeProvider} from "styled-components"
import {render} from "react-dom"
import React from "react"

import {EXAMPLE_THEME, EXAMPLE_VALUE} from "./constants"
import {Editor} from "./editor"
import {
  //
  // wrapper component contains some default styles that make your editor
  // useable on mobile and desktop; you may like to check this component
  // and recreate it as your own with custom styles or attempt to overwrite
  // css in another way
  Wrapper,
  //
} from "../src/components/vignettes/Wrapper"
import Picture from "../src/components/vignettes/Picture"
import Reader from "../src/components/vignettes/Reader"

render(
  <div>
    <ThemeProvider theme={EXAMPLE_THEME}>
      <BrowserRouter>
        <Wrapper>
          <h1>Editor</h1>
          <Editor />
          <h1>Reader</h1>
          <Reader
            options={{domain: "localhost:3002"}}
            value={EXAMPLE_VALUE}
            components={{Picture}}
          />
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
