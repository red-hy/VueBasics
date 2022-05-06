<template>
   <div>
     <School></School>
     <Student></Student>
   </div>
</template>

<script>
import School from './School';  //同import School from './School.vue';
import Student from "./Student";

export default {
  name: "App",
  //汇总所有的组件
  components:{
    Student,
    School
  }
}
</script>
