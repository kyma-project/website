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
    background: ${colorBg};
    color: ${colorText};
    font-size: 14px;
    font-family: "Fira Mono", Consolas, Menlo, Monaco, "Courier New", Courier,
      monospace;
    border-radius: 4px;
    padding: 33px 45px 20px;
    @media (max-width: 1025px) {
      padding: 40px 45px 25px;
    }
    position: relative;
    box-sizing: border-box;
  }

  [data-termynal]:before {
    content: "";
    position: absolute;
    top: 13px;
    left: 13px;
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    /* A little hack to display the window buttons in one pseudo element. */
    background: #d9515d;
    box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;
  }

  [data-termynal]:after {
    content: "bash";
    position: absolute;
    color: ${colorTextSubtle};
    top: 5px;
    left: 0;
    width: 100%;
    text-align: center;
  }

  [data-ty] {
    display: block;
    line-height: 1.8;
  }

  [data-ty]:before {
    /* Set up defaults and ensure empty lines are displayed. */
    content: "";
    display: inline-block;
    vertical-align: middle;
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
