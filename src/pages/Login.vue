<template>
  <q-page class="flex flex-center">
    <div class="text-center q-pa-md flex flex-center">
      <div class="q-pa-md flex flex-center rounded-borders">
        <div class="col-6">

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {QSpinnerFacebook} from "quasar";

export default {
  mounted() {
    this.$q.loading.show({message: "Переадресация...", spinner: QSpinnerFacebook});
    let domain = process.env.PROD ? 'https://constructor.auditory.ru' : 'https://constructor.auditory.ru';
    location.href = domain + '/auth/login/keycloak';
  }
}
</script>
