/*
 * File: c:\enail-magic-client\src\components\gradientSvg\gradientSvg.tsx
 * Project: c:\enail-magic-client
 * Created Date: Thursday August 23rd 2018
 * Author: J-Cat
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * License: 
 *    This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 
 *    International License (http://creativecommons.org/licenses/by-nc/4.0/).
 * -----
 * Copyright (c) 2018
 */
import * as React from 'react';
import { GradientSvgProps } from './container';

export class GradientSVG extends React.Component<GradientSvgProps.IProps, GradientSvgProps.IState> {
    public render() {
      const { startColor, endColor, idCSS, rotation } = this.props;
  
      const gradientTransform = `rotate(${rotation})`;
  
      return (
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id={idCSS} gradientTransform={gradientTransform}>
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
        </svg>
      );
    }
}
  