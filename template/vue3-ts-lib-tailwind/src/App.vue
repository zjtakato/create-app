<script setup lang="ts">
import { Example } from './libs';
</script>

<template>
  <Example btn1-value="btn1" :btn2-value="{ value: 'btn2' }"></Example>
</template>
