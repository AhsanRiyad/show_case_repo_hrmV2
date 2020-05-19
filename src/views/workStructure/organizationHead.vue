<template>
  <span>
   
    <cTreeSelect 
    v-model="my_val"
    placeholder="Select From Tree"
    >
    </cTreeSelect>

  </span>
</template>

<script>
// import the component

export default {
data: ()=>{
  return {
    value: '',
    my_val: 9,
  }
},
watch: {
  value: {
    handler: function (newVal) {
        console.log('in the parent');
        console.log(newVal);
    },
    immediate: true,
  },
  my_val: {
    handler: function (newVal) {
        console.log('in the parent_my_val');
        console.log(newVal);
    },
    immediate: true,
  }
}

};
</script>
