<script lang="ts">
  export let type: 'info' | 'error' = 'info';
</script>

<div class="notification {type}">
  <slot />
</div>

<style lang="scss">
  .notification {
    padding: 10px 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 14px;
    
    &.info {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    &.error {
      background: #ffebee;
      color: #d32f2f;
    }
  }
</style> 