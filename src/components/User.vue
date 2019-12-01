<template>
  <div class="form">
    <h1 v-if="user.id!= 0">User Update</h1>
    <h1 v-else>New User</h1>
    <b-form @submit.stop.prevent="saveUser">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="firstname">First Name:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              v-model="user.firstname"
              id="firstname"
              placeholder="First Name"
              :state="$v.user.firstname.$dirty ? !$v.user.firstname.$error : null"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="lastname">Last name:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              v-model="user.lastname"
              id="lastname"
              placeholder="Last Name"
              :state="$v.user.lastname.$dirty ? !$v.user.lastname.$error : null"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="email">Email:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              v-model="user.email"
              type="email"
              id="email"
              placeholder="Enter your email"
              :state="$v.user.email.$dirty ? !$v.user.email.$error : null"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="birthDate">Birth Date:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              v-model="user.birthDate"
              type="date"
              id="birthDate"
              placeholder="Birth Date"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-default">Address</label>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="street">Street:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              v-model="user.address.street"
              id="street"
              placeholder="Street"
              :state="$v.user.address.street.$dirty ? !$v.user.address.street.$error : null"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="city">City:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              v-model="user.address.city"
              id="city"
              placeholder="City"
              :state="$v.user.address.city.$dirty ? !$v.user.address.city.$error : null"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="country">Country:</label>
          </b-col>
          <b-col sm="4">
            <b-form-select
              v-model="user.address.country"
              :options="countries"
              :state="$v.user.address.country.$dirty ? !$v.user.address.country.$error : null"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="2">
            <label for="postalcode">Postal Code:</label>
          </b-col>
          <b-col sm="4">
            <b-form-input
              v-model="user.address.postalcode"
              id="postalcode"
              placeholder="Postal Code"
              :state="$v.user.address.postalcode.$dirty ? !$v.user.address.postalcode.$error : null"
            ></b-form-input>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col lg="8">
            <b-button to="/" variant="danger">Cancel</b-button>&nbsp;
            <b-button variant="primary" @click="saveUser()">Save</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>    
<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

const BASE_URI = "http://cloud.coderiders.ro:8031/users";
export default {
  name: "user",
  components: {},
  data() {
    return {
      countries: [
        { value: "SP", text: "SP" },
        { value: "UK", text: "UK" },
        { value: "DE", text: "DE" },
        { value: "US", text: "US" }
      ],
      user: {
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        birthDate: "",
        address: {
          id: "",
          street: "",
          city: "",
          country: "",
          postalcode: ""
        }
      }
    };
  },

  validations: {
    user: {
      firstname: { required },
      lastname: { required },
      email: { required, email },
      address: {
        street: { required },
        city: { required },
        country: { required },
        postalcode: { required }
      }
    }
  },

  mounted() {
    if (this.$route.params.id) {
      this.user.id = parseInt(this.$route.params.id);
      this.getUserById();
    }
  },
  methods: {
    getUserById: function() {
      axios
        .get(`${BASE_URI}/${this.user.id}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    saveUser: function() {
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      if (this.user.id == 0) {
        axios
          .post(BASE_URI, this.user)
          .then(response => {
            if (response.status == 201) {
              alert("User created!");
              this.$router.push("/");
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        axios
          .put(`${BASE_URI}/${this.user.id}`, this.user)
          .then(response => {
            if (response.status == 200) {
              alert("User updated!");
              this.$router.push("/");
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }
    }
  }
};
</script>

<style>
.form {
  margin-left: 200px;
}
</style>