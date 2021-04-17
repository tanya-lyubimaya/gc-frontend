<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-avatar :color="avatarColor" text-color="white"
                :icon="custom_icon ? custom_icon : (passed ? 'check' : 'report_problem')"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ title }}</q-item-label>
      <q-item-label caption lines="2">
        {{ description }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-chip square>
        <span class="text-subtitle" v-if="['classroom', 'bonus'].includes(type) && passed && !custom_chip">{{ mark }}/{{ max_mark }}</span>
        <span class="text-subtitle" v-if="['classroom', 'bonus'].includes(type) && !passed && !custom_chip">не сдано</span>
        <span class="text-subtitle" v-if="(type === 'taiga') && !custom_chip">{{ mark }} <span class="gt-sm">{{ markTitle }}</span></span>
        <span class="text-subtitle" v-if="custom_chip">{{ custom_chip }}</span>
      </q-chip>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'TaskItem',
  computed: {
    markTitle() {
      return this.getTitle(this.mark, ["баллов", "балл", "баллов"])
    },
    avatarColor() {
      switch (this.type) {
        case "classroom":
          return this.passed ? 'green' : 'red';
        case "taiga":
          return (this.mark > 0) ? 'green' : 'orange';
        case "bonus":
          return this.passed ? 'green' : 'grey';
        default:
          return 'grey';
      }
    }
  },
  props: {
    title: String,
    color: {
      type: String,
      default: 'primary'
    },
    description: String,
    mark: Number,
    max_mark: Number,
    passed: Boolean,
    type: String,
    custom_chip: {
      type: String,
      default: null
    },
    custom_icon: {
      type: String,
      default: null
    }
  },
  methods: {
    getTitle(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
  }
}
</script>
