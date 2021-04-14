<template>
  <q-page class="flex flex-center" padding>
    <div class="q-pa-md fit row items-center justify-center content-center q-gutter-md">
      <div class="col-6">
        <q-card class="text-center">
          <q-card-section class="bg-primary text-white">
            <div class="text-h5">Задание на внешнем сервисе</div>
          </q-card-section>

          <q-card-section>
            <div class="text-body1">Это задание выполняется в редакторе диаграмм. Чтобы перейти к выполнению задания на
              внешнем сервисе, нажмите на
              кнопку ниже.
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2">Если при нажатии на кнопку ничего не происходит, обратитесь в техподдержку (зона
              ответственности проекта #588).
            </div>
          </q-card-section>


          <q-card-actions>
            <div class="row fit justify-center items-center content-center self-center q-pa-md">
              <form :action="redirectUrl" method="post">
                <input type="hidden" name="user_info" :value="authJwtContents">
                <input type="hidden" name="referrer" :value="referer">
                <q-btn
                  type="submit"
                  :loading="redirecting"
                  size="lg"
                  color="primary"
                  icon-right="launch"
                  label="Перейти"
                  padding="md"
                  @click="redirectToDiagrams"
                  unelevated
                />
              </form>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
const REDIRECT_URL = 'https://draw.miem.hse.ru/tasks';

export default {
  // name: 'PageName',
  data() {
    return {
      redirecting: false
    }
  },
  computed: {
    authJwtContents() {
      return this.$q.sessionStorage.getItem('auth_token');
    },
    redirectUrl() {
      return REDIRECT_URL + '?course=' + this.$route.params.c_id + '&task=' + this.$route.params.t_id;
    },
    referer() {
      return location.href;
    }
  },
  methods: {
    redirectToDiagrams() {
      this.redirecting = true;
      this.$q.loading.show({delay: 400, message: "Переадресация..."});
    }
  }
}
</script>
