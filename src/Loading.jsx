import React, { useRef, useState, useEffect, useContext } from 'react'
import { EffectsContext } from './index.jsx'

export default function Loading() {
    return (
        <div className="loading">
            <img src='/textures/icon-loading.svg' alt="Loading" />
        </div>
    );
}
