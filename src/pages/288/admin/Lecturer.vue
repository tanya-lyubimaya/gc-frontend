<template>
  <q-page padding>
    <q-inner-loading :showing="loading">
      <q-spinner-cube
        color="primary"
        size="4em"
      />
    </q-inner-loading>

    <div class="row justify-center" v-if="!loading && loading_error">
      <div class="col-md-6">
        <div class="q-pa-md q-gutter-md">
          <q-card class="q-pa-md text-center" flat bordered>
            <q-card-section>
              <div class="text-overline text-center">
                <q-icon name="warning" class="text-grey" style="font-size: 4rem;"/>
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">Ошибка</div>
              <p/>
              Не удалось получить данные с сервера.
              <p/>
              Попробуйте перезагрузить страницу или попробовать снова. Если проблема сохраняется длительное время,
              пожалуйста, обратитесь в техподдержку.<br>
            </q-card-section>
            <q-card-actions>
              <q-space/>
              <q-btn
                color="primary"
                label="Попробовать ещё раз"
                icon="refresh"
                @click="init()"
              />
              <q-space/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <!--    <div class="text-h4 text-center q-mx-md">Выбор платформы для проведения занятий</div>-->
    <div class="row justify-center" v-if="!loading">
      <div class="col-md-6">
        <div class="q-pa-md q-gutter-md">
          <q-card class="q-pa-md text-center" flat bordered>
            <q-card-section>
              <div class="text-overline text-center">
                <q-icon name="manage_accounts" class="text-grey" style="font-size: 4rem;"/>
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">Настройки для <strong>{{ this.email }}</strong></div>
              <p/>
              Для того, чтобы онлайн-занятие распозналось сервисом, необходимо поставить для него
              ссылку вида
              <pre>https://online.miem.hse.ru/123</pre>
              <br>
              Изменения, внесенные в РУЗ, будут получены сервисом в течение часа.<br>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row justify-center" v-if="!loading && disciplines_count === 0 && !loading_error">
      <div class="col-md-6">
        <div class="q-pa-md q-gutter-md">
          <q-card class="q-pa-md text-center" flat bordered>
            <q-card-section>
              <div class="text-overline text-center">
                <q-icon name="info" class="text-grey" style="font-size: 4rem;"/>
              </div>
              <div class="text-h5 q-mt-sm q-mb-xs">Онлайн-занятия не найдены</div>
              <p/>
              <div v-if="disciplines_count > 0">
              Для того, чтобы онлайн-занятие распозналось сервисом, необходимо поставить для него
              ссылку вида
              <pre>https://online.miem.hse.ru/123</pre>
              <br>
              Изменения, внесенные в РУЗ, будут получены сервисом в течение часа.<br>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="q-pa-md row items-start q-gutter-md" v-if="disciplines_count > 0 && !loading && !loading_error">
      <q-card class="my-card" v-for="discipline in disciplines" :key="discipline.oid">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ discipline.title }}</div>
        </q-card-section>

        <div v-for="kow in discipline.kows" :key="kow.oid">
          <q-card-section>
            <q-form>
                            <span v-if="kow.title != null" class="text-subtitle1">
                                      {{ kow.title }}
                                      <q-tooltip anchor="center right" self="center left">Тип занятия</q-tooltip>
                            </span>
              <q-select label="Выберите платформу"
                        :options="platforms"
                        v-model="kow.selected"
                        @input="updatePreference(discipline.oid, kow.oid, kow.selected, kow.url)"
                        emit-value
                        map-options
              />
              <q-input
                class="q-gutter-md"
                v-if="kow.selected === 'CUSTOM'"
                v-model="kow.url"
                type="url"
                label="Ссылка"
                debounce="500"
                @input="updatePreference(discipline.oid, kow.oid, kow.selected, kow.url)"
                outlined
              />
            </q-form>
          </q-card-section>

          <q-separator/>
        </div>
        <!--
                <q-card-actions align="right">
                  <q-btn color="primary" type="a" target="_blank" href="#" flat>Сбросить настройки</q-btn>
                </q-card-actions>
                -->
      </q-card>
    </div>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      notificationsPos: 'top',
      preferences: [],
      disciplines: [],
      disciplines_count: 0,
      loading: true,
      loading_error: false,
      email: null,
      platforms: [
        {
          label: 'Zoom',
          value: 'ZOOM',
        },
        {
          label: 'Jitsi',
          value: 'JITSI',
        },
        /*        {
                  label: 'Своя ссылка',
                  value: 'CUSTOM',
                },*/
        {
          label: 'Microsoft Teams',
          value: 'MS_TEAMS',
        },
      ]
    };
  },
  beforeMount() {
    this.notificationsPos = this.$q.platform.is.mobile ? 'bottom' : 'top';
    // if (this.$q.sessionStorage.getItem('is_student')) return;
  },
  async mounted() {
    this.email = this.$route.params.email;
    await this.init();
  },
  methods: {
    async init() {
      try {
        await this.getUserPreferences();
      }
      catch (e) {
        console.error(e);
        this.loading_error = true;
      }
      this.loading = false;
    },
    async getUserPreferences() {
      const path =
        `http://localhost:8000/api/v1/users/${this.email}/available-preferences`;
      const response = await this.$axios.get(path, {withCredentials: true});
      let preferences = response.data.preferences;
      let disciplines = {};
      for (const pref of preferences) {
        let d_oid = pref['ruz_discipline_oid'];
        let kow_oid = pref['ruz_kind_of_work_oid'];
        if (!(d_oid in disciplines)) {
          disciplines[d_oid] = {
            title: pref['ruz_discipline'],
            oid: d_oid,
            kows: []
          }
          this.disciplines_count++;
        }
        const kow_response = await this.$axios.get(
          `http://localhost:8000/api/v1/users/${this.email}/preferences/discipline/${d_oid}/kow/${kow_oid}`
        );
        disciplines[d_oid].kows.push({
          title: pref['ruz_kind_of_work'],
          oid: pref['ruz_kind_of_work_oid'],
          selected: kow_response.data['platform'],
          url: kow_response.data['url'],
        })
      }
      this.disciplines = disciplines;

    },
    async updatePreference(d_oid, kow_oid, selected_platform, url) {
      const path =
        `http://localhost:8000/api/v1/users/me/preferences/discipline/${d_oid}/kow/${kow_oid}`
      let preference = {
        platform: selected_platform,
        url: url,
      };
      try {
        if (selected_platform !== 'CUSTOM') {
          url = null;
        }
        await this.$axios
          .put(path, preference, {
            withCredentials: true,
          });
        this.$q.notify({
          position: this.notificationsPos,
          message: 'Предпочтения сохранены',
          icon: 'check'
        })
      } catch (e) {
        this.$q.notify({
          position: this.notificationsPos,
          icon: 'warning',
          type: 'negative',
          multiLine: true,
          message: "Не удалось сохранить предпочтения. Перезагрузите страницу или попробуйте позже.",
        });
      }
    },
  }
}
</script>
