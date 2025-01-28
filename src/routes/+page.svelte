<script lang="ts">
	/**
	 * Dependence
	 */
	import { onMount } from 'svelte';
	import PostsApi from '$lib/api/methods/posts';
	import { getReasonPhrase } from 'http-status-codes';
	import { CacheUtils } from '$lib/utils/cache';

	/**
	 * Components
	 */
	import Feed from '$lib/components/feed/Feed.svelte';
	import Loader from '$lib/components/shared/Loader.svelte';
	import ErrorComponent from '$lib/components/shared/Error.svelte';
	import Notification from '$lib/components/shared/Notification.svelte';

	/**
	 * Load data
	 * @description Метод для получения постов
	 */
	const loadData = async () => {
		try {
			const response = await PostsApi.getAll();

			if (response.success) {
				// Save to cache on successful API response
				CacheUtils.savePostsToCache(response.data);
				return response.data;
			}

			// If API fails, try to load from cache
			const cachedPosts = CacheUtils.getPostsFromCache();
			if (cachedPosts) {
				isLoadingFromCache = true;
				showCacheNotification = true;
				return cachedPosts;
			}

			// If no cache available, throw error
			throw new Error('Нет данных для отображения.');
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error(getReasonPhrase((error as any).code || 500));
		}
	};

	let isLoadingFromCache = false;
	let showCacheNotification = false;

	onMount(() => {
		// Hide cache notification after 3 seconds
		if (showCacheNotification) {
			setTimeout(() => {
				showCacheNotification = false;
			}, 3000);
		}
	});
</script>

{#if showCacheNotification}
	<Notification type="info">
		Данные загружены из кэша
	</Notification>
{/if}

{#await loadData()}
	<Loader />
{:then posts}
	<Feed {posts} />
{:catch e}
	<ErrorComponent>
		{e.message}
	</ErrorComponent>
{/await}
