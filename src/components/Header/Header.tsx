import React  from "react";
import "./Header.css"

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
    const headerClass = `header ${variant} ${className ? className : ""}`;
    const titleClass = `header__title ${variant}`;
    const legendClass = `header__legend ${variant}`;
    
   
   return(
    <header className={headerClass}>
        <p className={titleClass}>{legend}</p>
        <h3 className={legendClass}>{title}</h3>
    </header>
   )
}