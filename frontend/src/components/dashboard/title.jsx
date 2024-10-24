import { useEffect } from 'react';
import { gsap } from 'gsap';
import './title.scss'; 

const AnimatedHeadline = () => {
    useEffect(() => {
        var tl = gsap.timeline({ repeat: -1 });
        tl.to("h1", {
            backgroundPosition: "-960px 0",
            duration: 30,
        });
    }, []); 

    return (
        <div className="wrapper">
            <h1 className="title">Weather or not </h1>
        </div>
    );
};

export default AnimatedHeadline;
