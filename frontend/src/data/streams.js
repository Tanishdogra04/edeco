import streamsData from './streams.json';

// Mock Data for all streams
export const getMockStreamData = (id) => {
  const lowerId = id?.toLowerCase() || '';

  if (lowerId.includes('mba') || lowerId.includes('business') || lowerId.includes('management')) return streamsData.streams.business;
  if (lowerId.includes('medical') || lowerId.includes('mbbs')) return streamsData.streams.medical;
  if (lowerId.includes('law') || lowerId.includes('llb')) return streamsData.streams.law;
  if (lowerId.includes('design')) return streamsData.streams.design;

  return streamsData.streams.engineering;
};

export const STREAM_CONFIGS = streamsData.STREAM_CONFIGS;

export const getStreamConfigKey = (streamId) => {
  const lowerId = streamId?.toLowerCase() || '';
  if (lowerId.includes('mba') || lowerId.includes('business') || lowerId.includes('management')) return 'business';
  if (lowerId.includes('medical') || lowerId.includes('mbbs')) return 'medical';
  if (lowerId.includes('law') || lowerId.includes('llb')) return 'law';
  if (lowerId.includes('design')) return 'design';
  return 'engineering';
};
