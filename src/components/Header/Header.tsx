import React  from "react";
import "../../global/default.css"

interface HeaderProps {
    title: string;
    legend?: string;
    variant? : "default" | "compact" | "large";
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    legend,
    variant = "default", 
    className,
    
}: HeaderProps) => {
    // Define the classes for the header, title, and legend based on the variant prop

    const headerClass = ` header bg-transparent text-center pt-[52px] font-normal leading-[100%]  ${className ?? ""}`;
    const titleClass = `font-lilita text-[7.5vw] mt-[2.5vh] text-center whitespace-nowrap justify-center flex  tracking-[0] text-[#F3F3F1] ${variant}`;
    const legendClass = `font-inter text-[32px] pt-0 pb-[25px] tracking-[0] text-[#F3F3F199] ${variant}`;

    // Return the header component with the appropriate classes and content
    // The legend is optional and will only render if provided
   
   return(
    <header className={headerClass}>
        <p className={legendClass}>{legend}</p>
        <h3 className={titleClass}>{title}</h3>
    </header>
   )
}