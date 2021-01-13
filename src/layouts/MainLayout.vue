<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="q-gutter-xs">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="gt-sm">
          Учебные сервисы МИЭМ
          <q-badge align="top">&beta;</q-badge>
        </q-toolbar-title>

        <q-space />

        <!--
        <q-btn flat round dense icon="apps" class="q-mr-sm">
          <q-menu
            :offset="[0, 20]"
            anchor="bottom middle"
            self="top middle"
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>New tab</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New incognito tab</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>History</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Downloads</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup>
                <q-item-section>Help &amp; Feedback</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
-->
        <q-btn flat round dense icon="notifications" class="q-mr-xs" />

        <div>
          <q-avatar color="pink" text-color="white">{{ name_abbr }}</q-avatar>
        </div>

        <q-btn
          flat
          round
          dense
          icon="exit_to_app"
          @click="logout"
          v-if="$router.currentRoute.name !== 'Login'"
          class="q-ml-sm"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Сервисы
        </q-item-label>
        <EssentialLink
          v-for="link in commonLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <!--      <q-separator/>-->
      <!--      <q-list>-->
      <!--        <q-item-label-->
      <!--          header-->
      <!--          class="text-grey-8"-->
      <!--        >-->
      <!--          Помощь-->
      <!--        </q-item-label>-->
      <!--        <EssentialLink-->
      <!--          v-for="link in supportLinks"-->
      <!--          :key="link.title"-->
      <!--          v-bind="link"-->
      <!--        />-->
      <!--      </q-list>-->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const commonLinksData = [
  {
    title: "Главная",
    icon: "home",
    link: "/",
    exact: true
  },
  // {
  //   title: 'Тесты',
  //   caption: 'Формы и всякое такое',
  //   icon: 'list',
  //   link: 'https://quasar.dev'
  // },
  {
    title: "Онлайн-занятия",
    caption: "Выбор платформы для занятий",
    icon: "today",
    link: "online-platforms",
    visible: false
  }

  // {
  //   title: 'CI/CD грейдеры',
  //   caption: 'Проверка решений студентов',
  //   icon: 'code',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Управление СКУД',
  //   caption: 'Доступ в помещения МИЭМ',
  //   icon: 'room_preferences',
  //   link: 'https://forum.quasar.dev'
  // }
];

const supportLinksData = [
  {
    title: "Справка",
    caption: "Как пользоваться сервисами",
    icon: "help_center",
    link: ""
  },
  {
    title: "Поддержка",
    caption: "Задать вопрос",
    icon: "support",
    link: ""
  },
  {
    title: "Обновления",
    caption: "Новый функционал",
    icon: "update",
    link: ""
  },
  {
    title: "О сервисе",
    caption: "",
    icon: "info",
    link: ""
  }
];

const studentsLinksData = [];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      commonLinks: commonLinksData,
      supportLinks: supportLinksData,
      studentsLinks: studentsLinksData
    };
  },
  mounted() {
    if (this.$q.sessionStorage.getItem("is_teacher")) {
      this.commonLinks[1].visible = true;
    }
  },
  computed: {
    name_abbr() {
      return this.$q.sessionStorage.getItem("name_abbr");
    },
    full_name() {
      return this.$q.sessionStorage.getItem("full_name");
    },
    is_student() {
      return this.$q.sessionStorage.getItem("is_student");
    },
    is_teacher() {
      return this.$q.sessionStorage.getItem("is_teacher");
    }
  },
  methods: {
    logout() {
      this.$axios
        .post(
          "/auth/api/v1/auth/logout",
          { logout: true },
          { withCredentials: true }
        )
        .then(res => {
          this.$router.push({ name: "Login" });
        })
        .catch(err => {
          this.$q.notify({
            position: this.notificationsPos,
            icon: "warning",
            type: "negative",
            multiLine: true,
            message: "При выполнении выхода произошла ошибка."
          });
        });
    }
  }
};
</script>
