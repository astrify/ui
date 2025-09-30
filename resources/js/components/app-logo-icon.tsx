import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path stroke="#FFF7ED" stroke-width="1.5" d="M20.544 26.634A2 2 0 0 0 22.44 28h2.784a2 2 0 0 0 1.897-2.633l-6.21-18.632A4 4 0 0 0 17.117 4h-2.234a4 4 0 0 0-3.795 2.735l-6.21 18.633A2 2 0 0 0 6.774 28h2.782a2 2 0 0 0 1.898-1.37l.75-2.26A2 2 0 0 1 14.103 23h3.786a2 2 0 0 1 1.897 1.366l.758 2.268Z" clip-rule="evenodd"/>
        <path fill="#FFF7ED" d="M14.681 13.956 13.61 17.17c-.3.9.37 1.83 1.319 1.83h2.143a1.39 1.39 0 0 0 1.318-1.83l-1.071-3.214c-.423-1.267-2.215-1.267-2.638 0Z"/>
        <path fill="#FFF7ED" fill-rule="evenodd" d="M11.5 26.369c.365.388.883.631 1.458.631h6c.574 0 1.092-.242 1.456-.629l-.67-2.005A2 2 0 0 0 17.849 23h-3.786a2 2 0 0 0-1.898 1.37l-.664 1.999Z" clip-rule="evenodd"/>
    </svg>
    );
}
