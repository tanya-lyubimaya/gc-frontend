<template>
  <q-page padding>
    <div class="text-h4 text-center q-mx-md">Выбор платформы для проведения занятий</div>
    <div v-if="$q.sessionStorage.getItem('is_teacher')">
      <div class="row justify-center q-my-md q-ml-md">
        <div class="col-md-6">
          <q-card class="g-ma-md" flat bordered>
            <q-card-section>
              <q-card-section>
                Выбранная платформа по умолчанию
                <q-select label="Выберите платформу"
                          v-model="prefs['default_platform']"
                          :options="platforms"
                          @input="sendUpdatedPreferences"
                          emit-value
                          map-options
                />
              </q-card-section>


              <!--            <q-card-actions>-->
              <!--              <q-btn color="primary">Синхронизировать расписание</q-btn>-->
              <!--            </q-card-actions>-->
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-separator/>
      <q-banner class="bg-orange text-white q-ma-md" v-if="sync_error">
        <template v-slot:avatar>
          <q-icon name="warning"/>
        </template>
        Не удалось синхронизировать расписание. Список дисциплин и типов занятий может быть неполным.
      </q-banner>
      <div class="row items-start justify-center q-pa-md q-gutter-md">
        <div class="col-md-6 q-gutter-md">
          <q-card v-for="(discipline, oid) in disciplines" :key="oid" class="q-g">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">{{ discipline['discipline_name'] }}</div>
            </q-card-section>
            <q-card-section v-for="(lesson_type, kow_oid) in discipline['lesson_types']" :key="kow_oid">
              <q-form>
              <span class="text-subtitle1">
                        {{ lesson_type['kind_of_work'] }}
                        <q-tooltip anchor="center right" self="center left">Тип занятия</q-tooltip>
              </span>
                <q-select label="Выберите платформу"
                          v-model="disciplines[oid]['lesson_types'][kow_oid].platform"
                          :options="platforms"
                          @input="sendUpdatedPreferences"
                          emit-value
                          map-options
                />
              </q-form>
            </q-card-section>
            <q-card-section>

            </q-card-section>
          </q-card>
          <!--        <h6 class="text-h6">Выберите платформу, которая будет использоваться по умолчанию</h6>-->
          <!--        </q-card-section>-->
          <!--        <q-card-section class="q-gutter-md">-->
          <!--          <q-select v-model="prefs.default_platform" :options="platforms"/>-->
          <!--          <q-btn color="primary" @click="sendUpdatedPreferences()">Сохранить изменения-->
          <!--          </q-btn>-->
        </div>
      </div>
    </div>
    <div v-if="$q.sessionStorage.getItem('is_student')" class="q-mt-xl text-center">
      <q-icon name="highlight_off" size="xl" color="red"/>
      <div class="text-h6">
        Сервис доступен только для преподавателей.
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      notificationsPos: 'top',
      prefs: [],
      disciplines: [],
      sync_error: false,
      platforms: [
        {
          label: 'Zoom',
          value: 'ZOOM',
        },
        {
          label: 'Jitsi',
          value: 'JITSI',
        },
        {
          label: 'Google Meet',
          value: 'GOOGLE_MEET',
        },
        {
          label: 'Microsoft Teams',
          value: 'MS_TEAMS',
        },
      ]
    };
  },
  beforeMount() {
    this.notificationsPos = this.$q.platform.is.mobile ? 'bottom' : 'top';
    if (this.$q.sessionStorage.getItem('is_student')) return;
    this.$q.loading.show({
      delay: 400,
      message: "Синхронизация расписания...."
    })
    this.syncUserPreferences();
    this.$q.loading.show({
      delay: 400,
      message: "Загрузка..."
    })
    this.getUserPreferences();
    this.$q.loading.hide()
  },
  methods: {
    getUserPreferences() {
      const path =
        "https://constructor.auditory.ru/epi/api/v1/users/preferences";
      this.$axios.get(path, {withCredentials: true}).then(
        (res) => {
          this.prefs = res.data;
          console.log(res.data);
          this.disciplines = this.prefs.disciplines;
          console.log(this.disciplines)
        },
        (error) => {
          console.error(error);
        }
      );
    },
    syncUserPreferences(force = false) {
      const path =
        "https://constructor.auditory.ru/epi/api/v1/users/preferences/sync";
      this.$axios
        .post(
          path,
          {},
          {
            params: {force: force},
            withCredentials: true,
          }
        )
        .then((res) => {
            if (res.data && !(res.data.status === 'CACHED' || res.data.status === 'SYNCED'))
              this.sync_error = true;
          }
        )
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          this.$q.notify({
            position: this.notificationsPos,
            icon: 'warning',
            type: 'negative',
            message: "Не удалось синхронизировать настройки!",
          });
        });
    },
    sendUpdatedPreferences() {
      const path =
        "https://constructor.auditory.ru/epi/api/v1/users/preferences";
      this.$axios
        .put(path, this.prefs, {
          withCredentials: true,
        })
        .then(
          this.$q.notify({
            position: this.notificationsPos,
            message: 'Предпочтения сохранены',
            icon: 'check'
          })
        )
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          this.$q.notify({
            position: this.notificationsPos,
            icon: 'warning',
            type: 'negative',
            multiLine: true,
            message: "Не удалось сохранить предпочтения. Перезагрузите страницу или попробуйте позже.",
          });
        });
    },
  }
}
</script>
