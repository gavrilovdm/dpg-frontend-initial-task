export const CacheUtils = {
  POSTS_CACHE_KEY: 'cached_posts',

  savePostsToCache(posts: any[]) {
    try {
      localStorage.setItem(this.POSTS_CACHE_KEY, JSON.stringify(posts));
      return true;
    } catch (e) {
      console.error('Failed to save posts to cache:', e);
      return false;
    }
  },

  getPostsFromCache() {
    try {
      const cached = localStorage.getItem(this.POSTS_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      console.error('Failed to get posts from cache:', e);
      return null;
    }
  }
};