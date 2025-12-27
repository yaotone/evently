import { useEffect, useRef, useState, type JSX } from "react"
import "./Menu.css"

interface IMenu {
    children: JSX.Element,
    page: number
}

export function Menu({ children, page }: IMenu) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [left, setLeft] = useState( undefined == menuRef.current ? 0 : menuRef.current.clientWidth / 2 );

    useEffect(() => {
        const updateDotPosition = () => {
            if (!menuRef.current) return;

            const menuElement = menuRef.current;
            const menuItems = menuElement.querySelectorAll('.MenuButton');

            if (menuItems.length === 0 || page > menuItems.length) return;

            const activeItem = menuItems[page-1] as HTMLElement;
            const itemRect = activeItem.getBoundingClientRect();

            const itemCenter = itemRect.left + itemRect.width / 2;
            setLeft(itemCenter - 5); 
        };

        updateDotPosition();
    }, [page, children]);

    return (
        <>
            <div className="Menu" ref={menuRef}>
                {children}
                <div className="Menu_dot" style={{ left: `${left}px` }} />
            </div>
        </>
    )
}