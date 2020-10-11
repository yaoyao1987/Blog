<template>
  <div>
    <button @click="$store.commit('syncChange',5)">点我+5</button>
    {{$store.state.age}}
  </div> 
</template>

<script>
export default {
  name: "App",
};
</script>
