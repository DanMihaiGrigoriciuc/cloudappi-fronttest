<template>
  <div class="row">
    <div class="col">
      <table class="table table-hover table-sprite">
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>BIRTHDATE</th>
            <th>ADDRESS</th>
            <th colspan="8">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user">
            <td width="10px">{{user.id}}</td>
            <td>{{user.firstname}}</td>
            <td>{{user.lastname}}</td>
            <td>{{user.email}}</td>
            <td>{{user.birthDate}}</td>
            <td>{{user.address.street}} {{user.address.city}} - {{user.address.city}} - {{user.address.country}} - {{user.address.postalcode}}</td>
            <td width="10px">
              <b-button
                :to="{ name: 'EditUser', params: { id: user.id } }"
                class="btn btn-warning"
              >Edit</b-button>
            </td>
            <td width="10px">
              <a @click="deleteUser(user.id)" href="#" class="btn btn-danger">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const BASE_URI = "http://cloud.coderiders.ro:8031/users";

export default {
  components: {},
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.refreshList();
  },
  methods: {
    refreshList() {
      axios.get(BASE_URI).then(response => (this.users = response.data));
    },
    deleteUser(userId) {
      axios
        .delete(`${BASE_URI}/${userId}`)
        .then(response => {
          if (response.status == "200") {
            alert("User deleted! ");
            this.refreshList();
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

