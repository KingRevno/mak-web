import React, { useState } from 'react';


const AboutPage = () => {

    const [about, setAbout] = useState({
        title: 'About Me'
    })

    return (

        <div className="center">
            <p>Hello, my name is Tony Mak. I'm a upcoming senior graduate at University of Central Florida for Computer Engineering. I have classroom experience in Java, C, C#, and python,
                but my goal is to become a full stack engineer. So I taught myself how to do web development, I have experience in React, JavaScript, Node JS, Firebase, HTML and CSS. </p>

            <p>My dream is to one day start my own business and become an entrepreneur, it excites me to think about the future!</p>
            <p>This is center within a hero component and a contect component for design </p>
        </div>

    )

}

export default AboutPage;