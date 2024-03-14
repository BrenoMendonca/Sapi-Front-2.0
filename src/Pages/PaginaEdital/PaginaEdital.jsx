import './../PaginaEdital/PaginaEdital.css';
import Navbar from '../../Components/Navbar/Navbar';
import { SidebarEdital } from '../../Components/SidebarEdital/SidebarEdital';

export const PaginaEdital = () => {
    return (
        <div style={{background: '#DAE7EF', height: '100vh'}}>
            <Navbar />

            <div style={{marginLeft: '5%', marginRight: '5%'}}>
                <div className='cabecalho-edital'>
                    <h1>Edital de teste</h1>
                    <strong>Projeto de inovação</strong>
                </div>

                <SidebarEdital />
            </div>

        </div>
    )
}