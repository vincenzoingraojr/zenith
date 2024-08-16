import { FunctionComponent } from "react";
import { Path, Svg } from "react-native-svg";

interface EyeProps {
    mode: boolean;
    color: string;
}

const Eye: FunctionComponent<EyeProps> = ({ mode, color }) => {
    return (
        <Svg viewBox="0 0 24 24" width={22} height={22} fill={color} stroke={"none"}>
            {mode ? (
                <>
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12ZM10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
                    />
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 4C9.29212 4 6.79216 5.33465 4.85934 6.78308C2.90878 8.2448 1.41234 9.91569 0.690796 10.7841C0.101358 11.4935 0.10136 12.5065 0.690797 13.2159C1.41234 14.0843 2.90879 15.7552 4.85934 17.2169C6.79217 18.6653 9.29212 20 12 20C14.7079 20 17.2078 18.6653 19.1406 17.2169C21.0912 15.7552 22.5877 14.0843 23.3092 13.2159C23.8986 12.5065 23.8986 11.4935 23.3092 10.7841C22.5877 9.91569 21.0912 8.2448 19.1406 6.78308C17.2078 5.33465 14.7079 4 12 4ZM6.05872 15.6165C4.32723 14.3189 2.96939 12.8221 2.28099 12C2.96939 11.1779 4.32723 9.6811 6.05871 8.38355C7.8526 7.03924 9.92663 6 12 6C14.0734 6 16.1474 7.03924 17.9413 8.38355C19.6728 9.6811 21.0306 11.1779 21.719 12C21.0306 12.8221 19.6728 14.3189 17.9413 15.6165C16.1474 16.9608 14.0734 18 12 18C9.92663 18 7.8526 16.9608 6.05872 15.6165Z"
                    />
                </>
            ) : (
                <>
                    <Path d="M4.70711 20.7071L20.7071 4.70711C21.0976 4.31658 21.0976 3.68342 20.7071 3.29289C20.3166 2.90237 19.6834 2.90237 19.2929 3.29289L3.29289 19.2929C2.90237 19.6834 2.90237 20.3166 3.29289 20.7071C3.68342 21.0976 4.31658 21.0976 4.70711 20.7071Z" />
                    <Path d="M12 4C13.4747 4 14.8878 4.39586 16.1812 4.99037L14.6533 6.51831C13.7836 6.19224 12.8917 6 12 6C9.92663 6 7.8526 7.03924 6.05871 8.38355C4.32723 9.6811 2.96939 11.1779 2.28099 12C2.93111 12.7764 4.17826 14.1545 5.77333 15.3982L4.34935 16.8222C2.64845 15.464 1.3481 14.007 0.690797 13.2159C0.10136 12.5065 0.101358 11.4935 0.690796 10.7841C1.41234 9.91569 2.90878 8.2448 4.85934 6.78308C6.79217 5.33465 9.29212 4 12 4Z" />
                    <Path d="M12 7C12.6449 7 13.2612 7.12208 13.8272 7.34438L7.34438 13.8272C7.12208 13.2612 7 12.6449 7 12C7 9.23858 9.23858 7 12 7Z" />
                    <Path d="M16.6556 10.1728L10.1728 16.6556C10.7388 16.8779 11.3551 17 12 17C14.7614 17 17 14.7614 17 12C17 11.3551 16.8779 10.7388 16.6556 10.1728Z" />
                    <Path d="M12 18C11.1083 18 10.2164 17.8078 9.34674 17.4817L7.8188 19.0096C9.11218 19.6041 10.5253 20 12 20C14.7079 20 17.2078 18.6653 19.1406 17.2169C21.0912 15.7552 22.5877 14.0843 23.3092 13.2159C23.8986 12.5065 23.8986 11.4935 23.3092 10.7841C22.6519 9.99301 21.3515 8.53598 19.6506 7.17778L18.2267 8.60175C19.8217 9.84552 21.0689 11.2236 21.719 12C21.0306 12.8221 19.6728 14.3189 17.9413 15.6165C16.1474 16.9608 14.0734 18 12 18Z" />
                </>
            )} 
        </Svg>
    );
};

export default Eye;