<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md" v-if="tasks.length === 0">
      <q-card class="q-pa-md text-center" flat bordered>
        <q-card-section>
          <div class="text-overline text-center"><q-icon name="info" class="text-grey" style="font-size: 4rem;" /></div>
          <div class="text-h5 q-mt-sm q-mb-xs">Задания не найдены :(</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="task in tasks" :key="task.title">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ task.title }}</div>
          <div class="text-subtitle2">Иван Иванов</div>
        </q-card-section>

        <q-card-section>
          Тут будет описание задания из проекта #590 или другая информация.
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn color="primary" type="a" target="_blank" :href="task.link" flat>Перейти к заданию</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {QSpinnerFacebook} from "quasar";

export default {
  data() {
    return {
      tasks: [],
      isLoading: false
    }
  },
  methods: {
    getUserTasks() {
      const path =
        "/workbook/user/" + this.$q.sessionStorage.getItem('google_email') + "/tasks";
      this.$axios.get(path, {withCredentials: true}).then(
        (res) => {
          this.tasks = res.data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  },
  mounted() {
    this.isLoading = true;
    this.$q.loading.show({message: "Загрузка...", spinner: QSpinnerFacebook});
    this.getUserTasks();
    this.isLoading = false;
    this.$q.loading.hide();
  }
}
</script>
