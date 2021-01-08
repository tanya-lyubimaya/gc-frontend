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

        <q-toolbar-title>
          Учебные сервисы МИЭМ
        </q-toolbar-title>


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

        <q-btn flat round dense icon="notifications" class="q-mr-xs" />

        <div class="gt-sm m">
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            Иван Иванов
          </q-chip>
        </div>
        <div class="lt-sm">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Сервисы
        </q-item-label>
        <EssentialLink
          v-for="link in commonLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-separator/>
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Помощь
        </q-item-label>
        <EssentialLink
          v-for="link in supportLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <q-table
      style="height: 400px"
      title="Курсы"
      :data="data"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    />
          <q-table
      style="height: 400px"
      title="КИмы"
      :data="data"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    />
          <q-table
      style="height: 400px"
      title="Тесты"
      :data="data"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const commonLinksData = [
  {
    title: 'Тесты',
    caption: 'Формы и всякое такое',
    icon: 'list',
    link: 'https://quasar.dev'
  },
  {
    title: 'Онлайн-занятия',
    caption: 'Выбор платформы для занятий',
    icon: 'today',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'CI/CD грейдеры',
    caption: 'Проверка решений студентов',
    icon: 'code',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Управление СКУД',
    caption: 'Доступ в помещения МИЭМ',
    icon: 'room_preferences',
    link: 'https://forum.quasar.dev'
  }
];

const supportLinksData = [
  {
    title: 'Справка',
    caption: 'Как пользоваться сервисами',
    icon: 'help_center',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Поддержка',
    caption: 'Как пользоваться сервисами',
    icon: 'support',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Обновления',
    caption: 'Как пользоваться сервисами',
    icon: 'update',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'О сервисе',
    caption: 'Как пользоваться сервисами',
    icon: 'info',
    link: 'https://awesome.quasar.dev'
  },
];

const studentsLinksData = [];

export default {
  name: 'MainLayout',
  components: {EssentialLink},
  data() {
    return {
      leftDrawerOpen: false,
      commonLinks: commonLinksData,
      supportLinks: supportLinksData,
      studentsLinks: studentsLinksData
    }
  }
}
</script>
