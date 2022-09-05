import { TabPanel } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';
import AdsConversionCodeForm from './Forms/AdsConversionCodeForm';
import AnalyticsEventForm from './Forms/AnalyticsEventForm';
import DataLayerPushForm from './Forms/DataLayerPushForm';
import EnhancedConversionForm from './Forms/EnhancedConversionForm';

function TaskConfigForm() {
  return (
    <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
      <TabPanel sx={{ height: '100%', padding: '14px' }} value="1">
        <AdsConversionCodeForm />
      </TabPanel>
      <TabPanel sx={{ height: '100%', padding: '14px' }} value="2">
        <AnalyticsEventForm />
      </TabPanel>
      <TabPanel sx={{ height: '100%', padding: '14px' }} value="3">
        <DataLayerPushForm />
      </TabPanel>
      <TabPanel sx={{ height: '100%', padding: '14px' }} value="4">
        <EnhancedConversionForm />
      </TabPanel>
    </Box>
  );
}

export default TaskConfigForm;
