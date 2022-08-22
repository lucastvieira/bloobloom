<template>
  <div :class="['side-menu', `side-menu-${id}`]" @mouseleave="doCloseMenu">
    <ul>
      <li v-if="level > 0 && items.length">
        <a href="javascript:void(0)" class="go-back" @click="doGoBack">
          <font-awesome-icon icon="fa-solid fa-chevron-left" />GO BACK
        </a>
      </li>
      <li v-for="(menu, key) in items" :key="key">
        <template v-if="menu.items">
          <a href="javascript:void(0)" @click="doOpen(menu.id)">
            {{ menu.title }}
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              v-if="menu.items"
            />
          </a>

          <SideMenu
            v-if="menu.items"
            :id="menu.id"
            :level="level + 1"
            :items="menu.items"
          />
        </template>
        <router-link
          v-else-if="menu.url"
          :to="menu.url"
          @click.prevent="doCloseMenu"
        >
          {{ menu.title }}
        </router-link>
        <a v-else href="javascript:void(0)">{{ menu.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideMenu",

  props: {
    primary: { type: Number, default: () => Math.random() },
    id: { type: String, default: "menu-0" },
    level: { type: Number, default: 0 },
    items: { type: Array, default: () => [] },
  },

  methods: {
    doOpen(id) {
      let sideMenu = document.querySelector(`.side-menu-${id}`);
      if (!sideMenu) return;
      sideMenu.classList.add("open");
    },

    doCloseMenu(evt) {
      if (this.isMobile() && evt.type == "mouseleave") return;

      let sideMenu = document.querySelectorAll(".side-menu.open");
      sideMenu.forEach((el) => {
        this.$nextTick(() => el.classList.remove("open"));
      });

      if (this.isMobile()) this.$store.dispatch("changeStatusMenuOpen");
    },

    doGoBack() {
      let sideMenu = document.querySelector(`.side-menu-${this.id}`);
      if (!sideMenu) return;
      sideMenu.classList.remove("open");
    },
  },

  computed: {
    zIndex() {
      return this.level;
    },
  },
};
</script>

<style lang="scss" scoped>
.side-menu {
  position: fixed;
  top: 59px;
  left: 0;
  transition: 0.5s all ease;
  margin-left: -481px;
  background-color: #fff;
  height: calc(100vh - 58px);
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  box-sizing: border-box;
  z-index: v-bind(zIndex);
  width: 100vw;
  max-width: 481px;

  @media screen and (min-width: 768px) {
    width: 481px;
  }

  &.open {
    margin-left: 0;
  }

  ul {
    li {
      display: block;
      list-style: none;
      border-bottom: 1px solid #000;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        &:hover:not(.go-back) {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
