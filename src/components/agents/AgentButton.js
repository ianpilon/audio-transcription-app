import React from 'react';

const AgentButton = ({ label, onClick }) => (
  <button className="agent-button" onClick={onClick}>
    {label}
  </button>
);

export default AgentButton;