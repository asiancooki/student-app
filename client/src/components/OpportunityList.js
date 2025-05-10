// OpportunityList.js
import React from 'react';

const OpportunityList = ({ opportunities }) => {
  return (
    <ul>
      {opportunities.map((opp) => (
        <li key={opp.id}>
          <h3>{opp.title}</h3>
          <p>{opp.description}</p>
          <a href={opp.external_url} target="_blank" rel="noopener noreferrer">Learn More</a>
        </li>
      ))}
    </ul>
  );
};

export default OpportunityList;
