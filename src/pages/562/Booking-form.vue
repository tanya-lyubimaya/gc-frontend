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
                  <div class="text-subtitle2">Доступ к онлайн-лаборатории</div>
                </q-card-section>
                <div style="padding: 3%">
                  <q-card-section>
                    <div style="overflow: auto; width: 40%">
                      <q-input filled v-model="email" type="email">
                        <template v-slot:before>
                          <q-icon name="mail" />
                        </template>
                      </q-input>
                    </div>
                    <h6 class="text-h6">На сколько часов нужен доступ?</h6>
                    <q-option-group
                      v-model="hours"
                      :options="hours_options"
                      color="primary"
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
                        :disable="hours == null"
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
      hours: null,
      hours_options: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        },
        {
          label: "4",
          value: "4"
        }
      ]
    };
  },
  computed: {
    email() {
      return this.$store.getters["user/userGoogleEmail"];
    },
    jwt() {
      return this.$store.state.user.sharedInfoToken;
    }
  },
  methods: {
    send() {
      if (1 <= this.hours <= 4) {
        const res = JSON.stringify({
          user_info: this.jwt,
          time_for: this.hours
        });
        this.$q.notify({
              position: this.notificationsPos,
              icon: "warning",
              type: "negative",
              multiLine: true,
              message: "Возникла ошибка!"
            });
        this.$axios
          .post(
            `${process.env.NETWORK_TECHNOLOGIES_API}/requests/access`,
            res,
            {
              headers: {
                "Content-Type": "application/json"
              },
              withCredentials: false
            }
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            this.$q.notify({
              position: this.notificationsPos,
              icon: "warning",
              type: "negative",
              multiLine: true,
              message: "Возникла ошибка!"
            });
          });
      } else {
        this.$q.notify({
          position: this.notificationsPos,
          icon: "warning",
          type: "negative",
          multiLine: true,
          message: "Возникла ошибка!"
        });
      }
    }
  }
};
</script>
