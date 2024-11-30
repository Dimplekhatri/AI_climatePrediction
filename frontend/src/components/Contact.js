import React from "react";
import "./Contact.css";

function Footer() {
    return (
        <footer id="contact" className="footer">
            <h3>Contact Us</h3>
            <p>Email: info@climatepredict.com</p>
            <p>Phone: +1-234-567-890</p>
            <p>Follow us on social media:
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
        </footer>
    );
}

export default Footer;
