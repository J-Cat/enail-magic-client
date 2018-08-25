/*
 * File: c:\enail-magic-client\src\layouts\container.tsx
 * Project: c:\enail-magic-client
 * Created Date: Friday August 24th 2018
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
import { withRouter } from 'react-router-dom';
import { CoreLayout } from './coreLayout';

export interface ICoreLayoutState {
    selectedTab: number
}

export default withRouter(CoreLayout);
