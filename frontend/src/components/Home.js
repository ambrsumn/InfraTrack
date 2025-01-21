import React from 'react'
import { TypeAnimation } from 'react-type-animation';

function Home() {
    return (
        <div className="text-center bg-black h-[83vh] pt-12" style={{ backgroundImage: `url('https://i.imgur.com/5sjYjnf.jpeg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', 'backgroundPosition': 'center', 'opacity': '0.8' }}>
            <p className=" text-[#FFC000] text-4xl font-bold mb-32 text-center">InfraTrack</p>
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed once, initially
                    'Place order of required items',
                    1000,
                    'Track your order status',
                    1000
                ]}
                speed={25}
                style={{ fontSize: '2em' }}
                repeat={Infinity}
                className='text-white text-2xl font-bold'
            />
        </div>
    )
}
export default Home