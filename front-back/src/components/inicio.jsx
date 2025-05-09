import { useState, useEffect } from 'react';

import barein from "../assets/img/Inicio/Barein.jpg";
import f1 from "../assets/img/Inicio/f1.jpeg";
import ferrari from "../assets/img/Inicio/ferrari.jpeg";
import george from "../assets/img/Inicio/george.jpeg";
import humo from "../assets/img/Inicio/humo.jpeg";
import max from "../assets/img/Inicio/max.jpg";
import premio from "../assets/img/Inicio/premio.jpeg";

const Inicio = () => {
    
    const [currentImage, setCurrentImage] = useState(barein);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const images = [barein, f1, ferrari, george, humo, premio, max];
        let currentIndex = 0;
    
        const interval = setInterval(() => {
            
            setOpacity(0);
    
            setTimeout(() => {
                
                currentIndex = (currentIndex + 1) % images.length;
                setCurrentImage(images[currentIndex]);
                setOpacity(1);
            }, 1000); 
        }, 2000);
    
        return () => clearInterval(interval);
    }, []);
    

    return (
        <div style={styles.container}>
    <img src={currentImage} alt="Slideshow" style={{ ...styles.image, opacity: opacity }} />
</div>

    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'black', 
        overflow: 'hidden', 
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'opacity 1s ease-in-out', 
        opacity: 1
    }
    
};


export default Inicio;
