import '../Footer/Footer.css'
import UniforIconFooter from '../../Assets/logo-unifor-footer.png';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FaFacebook, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'


export const Footer = () =>{
    return(
        <div className='footer'>
            <div className="background-footer">
                <div className="redes-sociais">
                <ul className='ul-footer-icons'>
                    <li className='footer-icon facebook-icon'>
                        <a href="https://www.facebook.com/uniforoficial/" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                    </li>
                    <li className='footer-icon instagram-icon'>
                        <a href="https://pt.linkedin.com/school/university-of-fortaleza/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </li>
                    <li className='footer-icon linkedin-icon'>
                        <a href="https://www.youtube.com/user/uniforcomunica" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </li>
                    <li className='footer-icon youtube-icon'>
                        <a href="https://www.instagram.com/uniforcomunica/" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                        </a>
                    </li>
                </ul>
                </div>
                <div className="footer-informacoes">
                    <h4><strong>Lapin | Unifor</strong></h4>
                    <h5>Fundação Edson Queiroz - Universidade de Fortaleza</h5>
                </div>
                <div className='container-img'>
                    <img className="logo-unifor-footer"  src={UniforIconFooter} alt="Logo Unifor-footer"></img>
                </div>
            </div>
            
        </div>
    )
}