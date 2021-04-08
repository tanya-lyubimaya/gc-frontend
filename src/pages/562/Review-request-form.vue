<template>
  <q-page padding>
    <div id="q-app">
      <div class="flex flex-center column">
        <div class="row" style="min-height: 100%; width: 80%; padding: 24px;">
          <div
            id="parent"
            class="fit row wrap justify-center items-start content-start"
            style="overflow: hidden;"
          >
            <div class="col-10" style="overflow: auto; padding: 30px">
              <q-card flat bordered style="margin-bottom: 30px">
                <q-card-section class="bg-primary text-white">
                  <div class="text-h6">
                    Дистанционное выполнение лабораторных работ по сетевым
                    технологиям
                  </div>
                  <div class="text-subtitle2">Запрос на проверку</div>
                </q-card-section>
                <div style="padding: 3%">
                  <q-card-section>
                    <div style="overflow: auto; width: 40%">
                      <q-input filled v-model="email" type="email">
                        <template v-slot:before>
                          <q-icon name="mail"
                        /></template>
                      </q-input>
                    </div>
                    <h6 class="text-h6">Для какой лабораторной работы запросить проверку?</h6>
                    <q-select
                      v-model="lab"
                      :options="labs"
                      label="Название лабораторной работы"
                    />
                  </q-card-section>
                  <q-card-section>
                    <div
                      class="fit row wrap justify-center items-start content-start"
                    >
                      <q-btn
                        label="Отправить"
                        icon-right="send"
                        color="blue"
                        :disable="lab == null"
                        @click="send()"
                      />
                    </div>
                  </q-card-section>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      email: this.$q.sessionStorage.getItem("hse_email"),
      lab: null,
      labs: [],
      jwt: this.$q.sessionStorage.getItem('auth_token')
    };
  },
  mounted() {
    this.getLabs();
  },
  methods: {
    getLabs() {
      this.$axios
        .get('http://172.18.208.84:2222/labs',)
        .then(res => {
          this.labs = res.data.labs;
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            position: this.notificationsPos,
            icon: 'warning',
            type: 'negative',
            multiLine: true,
            message: 'Возникла ошибка при получении списка лабораторных работ!'
          });
        });
    },
    send() {
      const res = JSON.stringify({
          user_info: this.jwt,
          task_name: this.lab
        });
        this.$axios
          .post('http://172.18.208.84:2222/requests/grade', res, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            this.$q.notify({
              position: this.notificationsPos,
              icon: 'warning',
              type: 'negative',
              multiLine: true,
              message: 'Возникла ошибка!'
            });
          });
    }
  }
};
</script>
