import { useState } from 'react';
import './SidebarEdital.css'; 

export const SidebarEdital = () => {

    const [isActive, setIsActive] = useState(false)

    const handleItemClick = (index) => {
        setIsActive(index === isActive ? null : index);
    }

    return (
        <ul className='sidebar-edital-wrapper'>
            <li className={isActive === 0 ? 'active-item' : ''} onClick={() => handleItemClick(0)}>Requisitos</li>
            <li className={isActive === 1 ? 'active-item' : ''} onClick={() => handleItemClick(1)}>Avaliações</li> {/* aqui coloquei termos pq esqueci da outra categoria da sidebar, dps eu confirmo contigo */}
        </ul>
    )
}