import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#011237", color: "#bbb", padding: "4rem 2rem", marginTop: "4rem" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start" }}>
                {/* Sección About */}
                <div style={{ flex: "1 1 200px", marginBottom: "2rem" }}>
                    <h4 style={{ color: "#fff", marginBottom: "1rem" }}>Sobre Nosotros</h4>
                    <p style={{ lineHeight: "1.6" }}>
                        Somos líderes en innovación, velocidad y excelencia deportiva. Nuestro compromiso es llevar la experiencia automovilística al siguiente nivel.
                    </p>
                </div>

                {/* Sección Contacto */}
                <div style={{ flex: "1 1 200px", marginBottom: "2rem" }}>
                    <h4 style={{ color: "#fff", marginBottom: "1rem" }}>Contacto</h4>
                    <p style={{ lineHeight: "1.6" }}>
                        contacto@formulauno.com<br />
                        +52 5512121212<br />
                        Ciudad de México, MX
                    </p>
                </div>
            </div>

            <div style={{ borderTop: "1px solid #333", marginTop: "3rem", paddingTop: "2rem", textAlign: "center", fontSize: "0.9rem", color: "#777" }}>
                © 2003 - 2025 Formula One World Championship Limited. Todos los derechos reservados.
            </div>
        </footer>
    );
};


export default Footer;
