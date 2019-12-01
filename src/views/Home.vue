<template>
  <div class="home">
    <h1>User List</h1>
    <UserList />
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from "@/components/UserList";

export default {
  name: "home",
  components: {
    UserList
  }
};
</script>
