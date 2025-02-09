import axios from 'axios';
const API_KEY = 'AIzaSyAQbqvxsgVCSn2KPbfPLHU19Je-HPmCEX4';
const MAX_RESULTS = 12;

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: API_KEY,
  },
});
  
export const fetchPopularVideos = async (pageToken = '') => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        maxResults: MAX_RESULTS,
        pageToken,
        regionCode: 'US',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    throw error;
  }
};

export const searchVideos = async (query, pageToken = '') => {
  try {
    const searchResponse = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        maxResults: MAX_RESULTS,
        q: query,
        type: 'video',
        pageToken,
      },
    });

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');
    const videoResponse = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoIds,
      },
    });

    return {
      items: videoResponse.data.items,
      nextPageToken: searchResponse.data.nextPageToken,
    };
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoId,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

export const fetchRelatedVideos = async (videoId) => {
  try {
    const relatedResponse = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: videoId,
        type: 'video',
        maxResults: 15,
      },
    });

    const videoIds = relatedResponse.data.items.map(item => item.id.videoId).join(',');
    const videoResponse = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoIds,
      },
    });

    return videoResponse.data.items;
  } catch (error) {
    console.error('Error fetching related videos:', error);
    throw error;
  }
};

export const fetchVideosByCategory = async (categoryId, pageToken = '') => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        maxResults: MAX_RESULTS,
        pageToken,
        videoCategoryId: categoryId,
        regionCode: 'US',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    throw error;
  }
  
};

export const fetchChannelDetails = async (channelId) => {
  try {
    const response = await youtubeApi.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id: channelId,
      },
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching channel details:', error);
    throw error;
  }
};

export const fetchVideoComments = async (videoId) => {
  try {
    const response = await youtubeApi.get('/commentThreads', {
      params: {
        part: 'snippet,replies',
        videoId: videoId,
        maxResults: 20,
        order: 'relevance',
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};