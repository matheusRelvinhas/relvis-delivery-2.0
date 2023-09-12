'use client';

import { useGlobalContext } from '@/Context/store';
import React from 'react';
import './StyledInput.css';

export default function StyledInput() {
  const { dataCss } = useGlobalContext();

  return (
    <div className="input-group">
      <input required type="text" name="text" autoComplete="off" className="input"/>
      <label className="user-label">First Name</label>
    </div>
  );
}
