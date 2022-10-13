import styled from "styled-components";
import { Typography } from "@mui/material";

type typo = {
    weight?: number;
    letspacing?: string;
    lineHeight?: string;
    color?: string;
};
const Typo = styled(Typography)<typo>`
    && {
        font-weight: ${(props) => props.weight};
        letter-spacing: ${(props) => props.letspacing};
        line-height: ${(props) => props.lineHeight};
        color: ${(props) => props.color};
    }
`;

export default Typo;
