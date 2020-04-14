<template>
  <div class="conversations-container row no-gutters stretch-scroll">
    <div class="col-auto bg-white d-flex flex-column border-right" :style="{width: '13rem'}">
      <div class="p-2 border-bottom">
        CoronaChat
      </div>
      <div class="stretch-scroll">
        <div :style="{height: '600px'}">
          test
        </div>
      </div>
      <div class="bg-white p-2 border-top">
        <b-link class="text-muted" :to="{ name: 'Settings' }">
          <font-awesome-icon :icon="['fas', 'cog']" />
        </b-link>
      </div>
    </div>
    <div class="col d-flex flex-column">
      <div class="p-2 text-center bg-white border-bottom">
        test
      </div>
      <div class="stretch-scroll">
        <div :style="{height: '600px'}">
          test
        </div>
      </div>
      <div class="border-top p-2">
        <b-form-input size="sm" class="rounded-pill" />
      </div>
    </div>
  </div>
</template>
