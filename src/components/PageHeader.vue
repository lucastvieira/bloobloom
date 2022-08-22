<template>
  <header>
    <div class="page-header">
      <nav class="nav-menu">
        <ul>
          <li
            class="menu"
            @mouseover="doMouseAction('open')"
            @mouseleave="doMouseAction('close')"
          >
            <a
              href="javascript:void(0)"
              class="menu-action"
              @click="doClickAction"
            >
              <span v-if="!isMenuOpened">Menu</span>
              <span v-else><font-awesome-icon icon="fa-solid fa-times" /></span>
            </a>
            <SideMenu :items="items" />
          </li>
        </ul>
      </nav>

      <div class="box-logo">
        <img src="@/assets/images/logo.png" />
      </div>
      <div class="box-right"></div>
    </div>
  </header>
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
export default {
  components: {
    SideMenu,
  },

  data() {
    return {
      items: [
        {
          id: "spectacles",
          title: "SPECTACLES",
          items: [
            {
              id: "spectacles-women",
              title: "WOMEN",
              url: "/spectacles/women",
            },
            { id: "spectacles-men", title: "MEN", url: "/spectacles/men" },
          ],
        },
        {
          id: "sunglasses",
          title: "SUNGLASSES",
          items: [
            {
              id: "sunglasses-women",
              title: "WOMEN",
              url: "/sunglasses/women",
            },
            { id: "sunglasses-men", title: "MEN", url: "/sunglasses/men" },
          ],
        },
        { id: "home-try-on", title: "HOME TRY ON" },
        { id: "pair-for-pair", title: "PAIR FOR PAIR" },
      ],
    };
  },

  methods: {
    doMouseAction(type) {
      if (this.isMobile()) return;

      let sideMenu = document.querySelector(".side-menu-menu-0");
      if (type == "close") {
        sideMenu.classList.remove("open");
        return;
      }
      sideMenu.classList.add("open");
    },

    doClickAction() {
      let sideMenu = document.querySelector(".side-menu-menu-0");

      if (!this.isMobile()) return;

      if (sideMenu.classList.contains("open")) {
        sideMenu.classList.remove("open");
        this.$store.dispatch("changeStatusMenuOpen");
        return;
      }
      this.$store.dispatch("changeStatusMenuOpen");
      sideMenu.classList.add("open");
    },
  },

  computed: {
    isMenuOpened() {
      return this.$store.state.isMenuOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 10;

  .page-header {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    height: 60px;

    .nav-menu {
      height: 100%;

      > ul {
        margin: 0;
        height: 100%;
        > li {
          display: block;
          width: 120px;
          height: 100%;
          font-size: 18px;
          letter-spacing: 2px;

          @media (hover: hover) {
            &:hover {
              a {
                text-decoration: underline;
              }
            }
          }

          > a {
            display: block;
            height: 100%;
            width: 100%;

            > span {
              display: flex;
              width: 100%;
              height: 100%;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }

    .box-logo {
      margin: 10px 0 10px -120px;
      img {
        width: 32px;
      }
    }
  }
}
</style>
