import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div className="text-center">
                <img src="https://i.ibb.co/1RTGKs4/Chicony.png" alt="" width="50px" className='mx-auto' />
                <p>Chicony Electronics<br></br>Providing reliable products since 2019</p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <span className="link link-hover">Branding</span>
                <span className="link link-hover">Design</span>
                <span className="link link-hover">Marketing</span>
                <span className="link link-hover">Advertisement</span>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <span className="link link-hover">About us</span>
                <span className="link link-hover">Contact</span>
                <span className="link link-hover">Jobs</span>
                <span className="link link-hover">Press kit</span>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <span className="link link-hover">Terms of use</span>
                <span className="link link-hover">Privacy policy</span>
                <span className="link link-hover">Cookie policy</span>
            </div>
        </footer>
    );
};

export default Footer;