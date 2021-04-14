<template>
  <div class="row justify-center">
    <div class="col-md-6">
      <div class="q-pa-md q-gutter-md">
        <q-card class="q-pa-md text-center" flat bordered>
          <q-card-section>
            <div class="text-overline text-center">
              <q-icon name="info" class="text-grey" style="font-size: 4rem;"/>
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">Тут название</div>
          <slot></slot>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {}
  },
  props: {
  }
}
</script>
