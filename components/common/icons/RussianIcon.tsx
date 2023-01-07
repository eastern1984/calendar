import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const RussianIcon: React.FC<SvgIconProps> = props => {
    return (
        <SvgIcon width="100%" height="auto" viewBox="0 0 28 20"  {...props}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="#F5F5F5" stroke-width="0.5" />
                <mask id="mask0_2950_5916" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
                    <rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="white" stroke-width="0.5" />
                </mask>
                <g mask="url(#mask0_2950_5916)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.3333H28V6.66663H0V13.3333Z" fill="#0C47B7" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V13.3334H0V20Z" fill="#E53B35" />
                </g>
            </svg>
        </SvgIcon>

    );
};

export default RussianIcon;