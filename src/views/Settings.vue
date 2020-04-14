<template>
  <div class="position-relative">
    <div class="border-bottom bg-white shadow-sm">
      <b-container class="py-2">
        <div class="row align-items-center">
          <div class="col">
            <h1>CoronaChat</h1>
          </div>
          <div class="col-auto">
            <b-link class="text-muted h1" @click="$router.go(-1)">
              <font-awesome-icon :icon="['fas', 'times-circle']" />
            </b-link>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>
