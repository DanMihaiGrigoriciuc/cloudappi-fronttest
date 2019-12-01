<template>
  <div class="about">
    <User/>
  </div>
</template>
<script>
// @ is an alias to /src
import User from "@/components/User";

export default {
  name: "home",
  components: {
    User
  }
};
</script>