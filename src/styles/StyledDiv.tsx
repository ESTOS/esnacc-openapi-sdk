import { styled } from "goober";
import { StyledDefaultArray, StyledDefaultProps } from "./defaults";

interface Props { }

const StyledComp = styled("div")<Props & StyledDefaultProps>([...StyledDefaultArray]);

export default StyledComp;
