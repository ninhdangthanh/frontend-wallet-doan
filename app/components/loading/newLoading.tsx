import React from 'react';
import { tailChase, quantum, waveform } from 'ldrs'

tailChase.register()
quantum.register()
waveform.register()


const ParticleAnimation: React.FC = () => {
  return (
    <>
      <div className="overlay_loading"></div>
      <div className='z-[1001] scale-[280%] flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <l-tail-chase
          size="40"
          speed="1.75" 
          color="white" 
        ></l-tail-chase>
      </div>
      {/* <div className='z-[1001] scale-[360%] flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <l-quantum
          size="40"
          speed="1.75" 
          color="white" 
        ></l-quantum>
      </div> */}
      {/* <div className='z-[1001] scale-[250%] flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <l-waveform
          size="40"
          speed="1.75" 
          color="white" 
        ></l-waveform>
      </div> */}
    </>
  );
};

export default ParticleAnimation;
