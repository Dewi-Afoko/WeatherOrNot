import { useEffect } from 'react';
import { gsap } from 'gsap';
import './titleheader.scss'; 

const AnimatedHeadline = () => {
    useEffect(() => {
        var tl = gsap.timeline({ repeat: -1 });
        tl.to("h9", {
            backgroundPosition: "-960px 0",
            duration: 30,
        });
    }, []); 

    return (
        <div className="wrapper9">
            <h1 className="title9">Weather or not </h1>
        </div>
    );
};

export default AnimatedHeadline;
