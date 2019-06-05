import React from 'react';
import MainApp from './appNavigation';
import config from '../resources/config';

const prefix = `${config.applicationId}://`;

export default () => <MainApp uriPrefix={prefix} />;
