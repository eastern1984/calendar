import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const EnglishIcon: React.FC<SvgIconProps> = props => {
    return (
        <SvgIcon width="100%" height="auto" viewBox="0 0 28 20"  {...props}>
            <rect width="28" height="20" rx="2" fill="white" />
            <mask id="mask0_2950_5069" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
                <rect width="28" height="20" rx="2" fill="white" />
            </mask>
            <g mask="url(#mask0_2950_5069)">
                <rect width="28" height="20" fill="#0A17A7" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-1.2825 -1.91644L10.6666 6.14335V-1.33333H17.3333V6.14335L29.2824 -1.91644L30.7736 0.294324L21.3262 6.66667H28V13.3333H21.3262L30.7736 19.7057L29.2824 21.9165L17.3333 13.8567V21.3333H10.6666V13.8567L-1.2825 21.9165L-2.77368 19.7057L6.67371 13.3333H-3.14713e-05V6.66667H6.67371L-2.77368 0.294324L-1.2825 -1.91644Z" fill="white" />
                <path d="M18.668 6.33219L31.3333 -2" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round" />
                <path d="M20.0128 13.6975L31.3667 21.3503" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round" />
                <path d="M8.00549 6.31049L-3.83752 -1.67096" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round" />
                <path d="M9.29 13.6049L-3.83752 22.3105" stroke="#DB1F35" stroke-width="0.666667" stroke-linecap="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12H12V20H16V12H28V8H16V0H12V8H0V12Z" fill="#E6273E" />
            </g>
        </SvgIcon>

    );
};

export default EnglishIcon;