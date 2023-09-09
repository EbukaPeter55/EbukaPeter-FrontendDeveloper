import React from 'react';
import heroImage from '../../assets/spacex-hero-image.png';

const HeroSection = () => {

    return (
        <section className='spacex-herowrapper flex justify-center gap-10'>
            <div className='spacex-herowrapper__content max-w-xl mt-44'>
            <h1>Get a glimpse of the magic in SpaceX</h1>
            <p className='mt-4'>Have you every wondered what SpaceX is all about?
                Let's take you through what its whole entirety is all about.
            </p>
            </div>
        </section>
    )
}

export default HeroSection;