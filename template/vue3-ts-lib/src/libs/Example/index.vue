<script setup lang="ts">
import './index.css';
import { ButtonValueDto } from './index.dto';

defineProps<{ btn1Value: string; btn2Value: ButtonValueDto }>();
</script>

<template>
  <button class="btn1">{{ btn1Value }}</button>
  <button :style="{ backgroundColor: 'red' }">{{ btn2Value.value }}</button>
  <button class="btn3">btn3</button>
</template>

<style scoped>
.btn3 {
  background-color: aqua;
}
</style>
