import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation3.json'; 

const MyLottieAnimation2 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Lottie
        options={defaultOptions}
        height={600} 
        width={800} 
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '500px', 
          margin: '0 auto',
          position: 'absolute',
          top: '-30rem' ,
          left: '4rem'
        }}
      />
    </div>
  );
};

export default MyLottieAnimation2;
