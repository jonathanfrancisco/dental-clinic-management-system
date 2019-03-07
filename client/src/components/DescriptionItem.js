import React from 'react';


const DescriptionItem = ({ title, content }) => (
   <div
      style={{
         fontSize: 14,
         lineHeight: '22px',
         marginBottom: 18,
         color: 'rgba(0,0,0,0.65)',
      }}
   >
      <p
         style={{
         margin: 0,
         display: 'block',
         color: 'rgba(0,0,0,0.85)',
         fontWeight: 'bold'
         }}
      >
         {title}:
      </p>
      {content}
   </div>
);

export default DescriptionItem;