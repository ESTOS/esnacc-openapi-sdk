import { css, keyframes } from "goober";

const loading = keyframes({
    "msFlowFrom, to": {
        opacity: "100%",
    },
    "50%": {
        opacity: "50%",
    },
});

const ButtonStyle = css({
    flex: "1 1 0px",
    "& button:disabled": {
        animation: `${loading} 1s ease-in-out`,
        animationIterationCount: "infinite",
    },
    "& button": {
        width: "100%",
        flex: "1 1 0px",
    },
});

const Comp = (Original: any) => (props: any) => {
    return (
        <div className={ButtonStyle}>
            <Original {...props} />
        </div>
    );
};

export default Comp;
