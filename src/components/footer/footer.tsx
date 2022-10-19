import './footer.css'
import * as React from "react";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

interface FooterProps {
    userName: string
}

const Footer: React.FC = (props: FooterProps) => {
    return (
        <>
            <Outlet />
            <div className='footer-container'>
                <div className="footer-category-container">
                    <h2>Client benefits.</h2>
                    <ul>
                        <Link to='/about'><li>30 days money back.</li></Link>
                        <Link to='/about'><li>Open the package before you pay.</li></Link>
                        <Link to='/about'><li>Permanent customer support.</li></Link>
                        <Link to='/about'><li>Card payment.</li></Link>
                        <Link to='/about'><li>Courier payment.</li></Link>
                    </ul>
                </div>
                <div className="footer-category-container">
                    <h2>Support information.</h2>
                    <ul>
                        <Link to='/contact'><li>Contact</li></Link>
                        <a href="https://anpc.ro/?ref=footer_3_6"><li>ANPC</li></a>
                    </ul>
                </div>
                <div className="footer-category-container">
                    <h2>General information.</h2>
                    <ul>
                        <Link to='/profile'><li>{props.userName}</li></Link>
                        <Link to='/about'><li>About Shop-n-all</li></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Footer