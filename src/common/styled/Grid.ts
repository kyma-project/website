import styled from "@styled";
import media from "@styled/media";

interface GridContainerProps {
  padding?: string;
}

const GridContainer = styled.div`
  width: 1200px;
  max-width: 100%;
  ${(props: GridContainerProps) =>
    props.padding ? props.padding : "padding: 30px 30px 0 30px"};
  margin: 0 auto;
`;

interface GridRowProps {
  space?: boolean;
  alignCenter?: boolean;
  direction?: string;
}

const GridRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  ${(props: GridRowProps) =>
    props.space &&
    `
    justify-content: space-between;
  `}

  ${props =>
    props.direction &&
    `
    direction: ${props.direction};
    `}

  ${props =>
    props.alignCenter &&
    `
    align-items: center;
  `}
`;

type GridUnits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridUnitProps {
  df?: GridUnits;
  xl?: GridUnits;
  lg?: GridUnits;
  md?: GridUnits;
  sm?: GridUnits;
  xs?: GridUnits;
  withoutPadding?: boolean;
  withoutMargin?: boolean;
}

const gridUnitStyles = {
  0: `
        flex: 0 0 0%;
        max-width: 0%;
        visibility: hidden;
        height: 0;
        width: 0;
    `,
  1: `
        flex: 0 0 8.33333%;
        max-width: 8.33333%;
    `,
  2: `
        flex: 0 0 16.66667%;
        max-width: 16.66667%;
    `,
  3: `
        flex: 0 0 25%;
        max-width: 25%;
    `,
  4: `
        flex: 0 0 33.33333%;
        max-width: 33.33333%;
    `,
  5: `
        flex: 0 0 41.66667%;
        max-width: 41.66667%;
    `,
  6: `
        flex: 0 0 50%;
        max-width: 50%;
    `,
  7: `
        flex: 0 0 58.33333%;
        max-width: 58.33333%;
    `,
  8: `
        flex: 0 0 66.66667%;
        max-width: 66.66667%;
    `,
  9: `
        flex: 0 0 75%;
        max-width: 75%;
    `,
  10: `
        flex: 0 0 83.33333%;
        max-width: 83.33333%;
    `,
  11: `
        flex: 0 0 91.66667%;
        max-width: 91.66667%;
    `,
  12: `
        flex: 0 0 100%;
        max-width: 100%;
    `,
};

const GridUnit = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  ${(props: GridUnitProps) =>
    props.withoutMargin ? "margin: 0;" : "margin-bottom: 15px;"}
  ${(props: GridUnitProps) => props.withoutPadding && "padding: 0;"}
  ${(props: GridUnitProps) => props.df && gridUnitStyles[props.df]}

  ${media.largeDesktop`
    ${(props: GridUnitProps) => props.xl && gridUnitStyles[props.xl]}
  `}

  ${media.desktop`
    ${(props: GridUnitProps) => props.lg && gridUnitStyles[props.lg]}
  `}

  ${media.tablet`
    ${(props: GridUnitProps) => props.md && gridUnitStyles[props.md]}
  `}

  ${media.phone`
    ${(props: GridUnitProps) => props.sm && gridUnitStyles[props.sm]}
  `}

  ${media.smallPhone`
    ${(props: GridUnitProps) => props.xs && gridUnitStyles[props.xs]}
  `}
`;

export default {
  Container: GridContainer,
  Row: GridRow,
  Unit: GridUnit,
};
