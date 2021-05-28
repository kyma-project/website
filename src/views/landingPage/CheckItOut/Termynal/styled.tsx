import styled from "@styled";

const colorBg = `#252a33`;
const colorText = `#eee`;
const colorTextSubtle = `#a2a2a2`;

export const TermynalStyles = styled.div`
  /**
 * termynal.js
 *
 * @author Ines Montani <ines@ines.io>
 * @version 0.0.1
 * @license MIT
 */

  /* @kyma-team: we made small changes to it to accomodate to our use */

  margin: 4px 0 10px 0;
  @media (max-width: 1025px) {
    margin: 10px 0 15px;
  }

  [data-termynal] {
    max-width: 100%;
    font-size: 14px;
    font-family: "Fira Mono", Consolas, Menlo, Monaco, "Courier New", Courier,
      monospace;
    border-radius: 4px;
    padding: 10px;
    @media (max-width: 1025px) {
      padding: 10px;
    }
    position: relative;
    box-sizing: border-box;
    border: 2px solid #a2a2a2;
    border-radius: 5px;
  }

  [data-ty] {
    display: block;
    line-height: 1.8;
  }

  [data-ty="input"]:before,
  [data-ty-prompt]:before {
    margin-right: 0.75em;
    color: ${colorTextSubtle};
  }

  [data-ty="input"]:before {
    content: "$";
  }

  [data-ty][data-ty-prompt]:before {
    content: attr(data-ty-prompt);
  }

  [data-ty-cursor]:after {
    content: attr(data-ty-cursor);
    font-family: monospace;
    margin-left: 0.5em;
    animation: blink 1s infinite;
  }
`;
