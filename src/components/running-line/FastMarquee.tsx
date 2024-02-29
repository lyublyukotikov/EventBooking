import React from 'react';
import Marquee from 'react-fast-marquee';

const FastMarquee: React.FC = () => {
 return (
    <Marquee
    speed={100}
 style={{
  
    fontSize: '30px',
    fontWeight: "300",
    
    lineHeight: "1.2",
    letterSpacing: "-0.00833em",
    color: 'rgba(0, 0, 0, 0.87)',
    paddingBottom: "30px",
    paddingTop: "30px",
    marginTop: "20px",
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    
 }}
    
    >
      МЫ=== {'>'} СЕМЬЯ❤️<br/>МЫ=== {'>'} СЕМЬЯ❤️МЫ=== {'>'} СЕМЬЯ❤️МЫ=== {'>'} СЕМЬЯ❤️МЫ=== {'>'} СЕМЬЯ❤️МЫ=== {'>'} СЕМЬЯ❤️МЫ=== {'>'} СЕМЬЯ❤️
      
    </Marquee>
 );
};

export default FastMarquee;