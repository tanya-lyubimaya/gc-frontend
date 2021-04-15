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
                          <q-icon name="mail"
                          />
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
      email: this.$store.getters["user/userHSEEmail"],
      hours: null,
      jwt:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX2VtYWlsIjoidmtAdmsudmsiLCJuYW1lIjoiSm9obiBEb2UiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.jeVYC8Fe9LaFlc9DkMaLAtnh5pJ7Tkh-4AF46_TkTUZ_4HpMygLX7NYRHYl0muQLqEjGrUIHKvLIqul7Aikd3GojLA4uAyfvZUUwdD2m2qQlcVhRyUxmX7msHQnaK27qPW8M8IR4OBlJ8L44vqRO1rP70KxdayTXS61y6G4P_dinw105ZaJF3aNW5uz8PYBJoXKZDJt07ucZCtsqZGwpv6XNjnwHS-icQOysAbkyxg-gFXRlnDRBzpOrVfEWOHNjsNQeoD8IUFEGzf-0jeKXzOES3VuFXVqScYXj5W2_ZFTVG9slvfpWOFxJWiFUqdneh8RO-3p9fvpU5ubSPJ3Buw',
      hours_options: [
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
        },
        {
          label: '3',
          value: '3'
        },
        {
          label: '4',
          value: '4'
        }
      ]
    };
  },
  methods: {
    send() {
      if (1 <= this.hours <= 4) {
        const res = JSON.stringify({
          user_info: this.jwt,
          time_for: this.hours
        });
        this.$axios
          .post('https://172.18.208.84:22222/requests/access', res, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: false
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
      } else {
        this.$q.notify({
          position: this.notificationsPos,
          icon: 'warning',
          type: 'negative',
          multiLine: true,
          message: 'Возникла ошибка!'
        });
      }
    }
  }
};
</script>
