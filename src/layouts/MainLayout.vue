<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpened = !leftDrawerOpened"
        />

        <q-toolbar-title class="gt-sm">
          Учебные сервисы МИЭМ
          <q-badge align="top">&beta;</q-badge>
        </q-toolbar-title>

        <q-space/>

        <q-btn flat round dense icon="notifications" class="q-mr-xs"/>

        <div v-if="false" class="gt-sm">
          <q-btn round flat>
            <q-avatar v-if="!thumbnailPhotoUrl" color="pink" text-color="white">{{ nameAbbr }}</q-avatar>
            <q-avatar v-else><img alt="Аватарка" :src="thumbnailPhotoUrl"/></q-avatar>
            <q-menu>
              <div style="min-width: 300px" class="q-pa-xs">
                <div class="row items-center q-pa-md">
                  <q-img src="~assets/material.png" style="height: 150px">
                    <div class="absolute-bottom bg-transparent">
                      <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://ssl.gstatic.com/s2/profiles/images/silhouette200.png">
                      </q-avatar>
                      <div class="text-weight-bold">{{ fullName }}</div>
                      <div>{{ isLecturer ? ruzDepartment : ruzGroup }}</div>
                    </div>
                  </q-img>
                  <q-btn
                    color="primary"
                    label="Выйти"
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
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
      v-model="leftDrawerOpened"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-img src="~assets/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://ssl.gstatic.com/s2/profiles/images/silhouette200.png">
          </q-avatar>
          <div class="text-weight-bold">{{ fullName }}</div>
          <div>{{ isLecturer ? ruzDepartment : ruzGroup }}</div>
        </div>
      </q-img>
      <q-list padding>
        <q-item-label header class="text-grey-8">
          Сервисы
        </q-item-label>
        <EssentialLink
          title="Главная"
          icon="home"
          link="/"
          exact
        />
        <EssentialLink
          v-for="link in commonLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>
        <q-list>
          <q-item-label header class="text-grey-8">
            Помощь
          </q-item-label>
          <EssentialLink
            v-for="link in supportLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import {checkHasRole} from "src/utils/roles";

const commonLinksData = [
  // {
  //   title: "Главная",
  //   icon: "home",
  //   link: "/",
  //   exact: true
  // },
  {
    title: "Онлайн-пары",
    caption: "Выбор платформы для занятий",
    icon: "today",
    link: "/online-platforms",
    exact: true,
    roles: ["LECTURER", "OFFICE", "SUPER_ADMIN", "DEVELOPER"],
  }, {
    title: "Управление онлайн-парами",
    caption: "Сервис для учебного офиса",
    icon: "event_note",
    link: "/online-platforms/admin",
    roles: ["OFFICE", "SUPER_ADMIN", "DEVELOPER"],
    allowForUsers: ["60759b050928a277deb73715"]
  },
  {
    title: "Тесты",
    caption: "Формы и всякое такое",
    icon: "list",
    link: "/form-create",
    roles: ["DEVELOPER", "SUPER_ADMIN"],
  },
  {
    title: "CI/CD грейдеры",
    caption: "Проверка решений студентов",
    icon: "code",
    link: "/ci-cd",
    roles: ["DEVELOPER", "SUPER_ADMIN"],
  },
  {
    title: "Решебники",
    caption: "Доп. вопросы по лабораторным работам",
    icon: "question_answer",
    link: "/solvers",
    roles: ["DEVELOPER", "SUPER_ADMIN"],
  },
  {
    title: "Лабораторные работы по сетевым технологиям",
    caption: "Мультивендорный эмуляторный комплекс для дистанционного выполнения лабораторных работ по сетевым технологиям",
    icon: "today",
    link: "/network-technologies",
    roles: ["DEVELOPER", "SUPER_ADMIN"],
    allowForUsers: ["60739ae61c79983c32b78b17"]
  },
  {
    title: "Workbook",
    caption: "Рабочие тетради по англ. языку",
    icon: "menu_book",
    link: "/workbook-tasks",
    roles: ["DEVELOPER", "SUPER_ADMIN"],
    allowForUsers: ["60759b050928a277deb73715"]
  },
  {
    title: "Сетевые видеотехнологии",
    caption: "Оценки за дисциплину",
    icon: "grade",
    link: "/nvt",
    allowForRuzGroups: ["БИВ181", "БИВ182"],
    roles: ["DEVELOPER", "SUPER_ADMIN", "COURSE_NVT"]
  }
  // {
  //   title: 'Управление СКУД',
  //   caption: 'Доступ в помещения МИЭМ',
  //   icon: 'room_preferences',
  //   link: 'https://forum.quasar.dev'
  // }
];

const supportLinksData = [
  /*{
    title: "Справка",
    caption: "Как пользоваться сервисами",
    icon: "help_center",
    link: ""
  }*/
  {
    title: "Поддержка",
    caption: "Задать вопрос",
    icon: "support",
    link: "feedback"
  } /*,
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
  }*/
];

const studentsLinksData = [];

export default {
  name: "MainLayout",
  components: {EssentialLink},
  data() {
    return {
      leftDrawerOpened: false,
      studentsLinks: studentsLinksData
    };
  },
  mounted() {
    if (this.$store.getters["user/isLecturer"]) {
      this.commonLinks[1].visible = true;
    }
  },
  computed: {
    commonLinks() {
      return commonLinksData.filter(this.checkHasLinkRole, this);
    },
    supportLinks() {
      return supportLinksData.filter(this.checkHasLinkRole, this);
    },
    nameAbbr() {
      return this.$store.getters["user/userNameAbbr"];
    },
    fullName() {
      return this.$store.getters["user/userFullName"];
    },
    isStudent() {
      return this.$store.getters["user/isStudent"];
    },
    isLecturer() {
      return this.$store.getters["user/isLecturer"];
    },
    thumbnailPhotoUrl() {
      return this.$store.getters["user/thumbnailPhotoUrl"];
    },
    ruzDepartment() {
      return this.$store.getters["user/ruzDepartment"];
    },
    ruzGroup() {
      return this.$store.getters["user/ruzGroup"];
    }
  },
  methods: {
    checkHasLinkRole(link) {
      if (link.roles) {
        if (link.allowForUsers?.includes(this.$store.state.user?.data?.id)) {
          return true;
        }
        if (link.allowForRuzGroups?.includes(this.$store.getters["user/ruzGroup"])) {
          return true;
        }
        return checkHasRole(this.$store.getters["user/dynamicRoles"], link.roles, link.excludeRoles);
      }
      return true;
    },
    // toggleLeftDrawer() {
    //   this.leftDrawerOpened = !this.leftDrawerOpened;
    //   this.$q.localStorage.set('left_drawer_opened', this.leftDrawerOpened);
    // },
    logout() {
      this.$axios
        .post("/auth/logout", {logout: true}, {withCredentials: true})
        .then(res => {
          this.$router.push({name: "Login"});
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
