<template>
  <div
    class="cardt-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="cardt"
  >
    <div class="cardt" :style="cardtStyle">
      <div class="cardt-bg" :style="[cardtBgTransform, cardtBgImage]"></div>
      <div class="cardt-info">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
const emit = defineEmits(["close"]);

let address = ref("");
let cardt: any = ref(null);
const mouseData: any = reactive({
  width: 0,
  height: 0,
  mouseX: 0,
  mouseY: 0,

  mouseLeaveDelay: null,
});

onMounted(() => {
  mouseData.width = cardt.value.offsetWidth;
  mouseData.height = cardt.value.offsetHeight;
  console.log("mounted width " + mouseData.width);
});
//   props: ['dataImage'],
const props = defineProps({
  dataImage: {
    type: String,
  },
});

const mousePX = computed(() => {
  let res = mouseData.mouseX / mouseData.width;
  // console.log('computed ' + res)

  // console.log('computed mouseX ' + mouseX.value)
  // console.log('computed width ' + width.value)
  return res;
});
const mousePY = computed(() => {
  return mouseData.mouseY / mouseData.height;
});
const cardtStyle = computed(() => {
  const rX = mousePX.value * 30;
  const rY = mousePY.value * -30;
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
  };
});
const cardtBgTransform = computed(() => {
  const tX = mousePX.value * 40;
  const tY = mousePY.value * -40;
  return {
    transform: `translateX(${tX}px) translateY(${tY}px)`,
  };
});
const cardtBgImage = computed(() => {
  return {
    backgroundImage: `url(${props.dataImage})`,
  };
});
const handleMouseMove = (e: any) => {
  mouseData.mouseX = (e.pageX - cardt.value.offsetLeft - mouseData.width) / 2;
  mouseData.mouseY = (e.pageY - cardt.value.offsetTop - mouseData.height) / 2;
};
const handleMouseEnter = () => {
  clearTimeout(mouseData.mouseLeaveDelay);
};
const handleMouseLeave = () => {
  mouseData.mouseLeaveDelay = setTimeout(() => {
    mouseData.mouseX = 0;
    mouseData.mouseY = 0;
  }, 1000);
};
</script>

<style lang="scss">
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

body {
  margin: 40px 0;
  font-family: "Raleway";
  font-size: 14px;
  font-weight: 500;
  background-color: #bcaaa4;
  -webkit-font-smoothing: antialiased;
}

.title {
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5d4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1 + p,
p + p {
  margin-top: 10px;
}

.cardt-wrap {
  margin: 10px;
  transform: perspective(1000px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;

  &:hover {
    .cardt-info {
      transform: translateY(0);
    }
    .cardt-info p {
      opacity: 1;
    }
    .cardt-info,
    .cardt-info p {
      transition: 0.6s $hoverEasing;
    }
    .cardt-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .cardt-bg {
      transition: 0.6s $hoverEasing, opacity 5s $hoverEasing;
      opacity: 0.8;
    }
    .cardt {
      transition: 0.6s $hoverEasing, box-shadow 2s $hoverEasing;
      box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}

.cardt {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.cardt-bg {
  box-sizing: content-box;
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s $returnEasing, opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.cardt-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(#000, 0.6) 100%
    );
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}

.cardt-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}
</style>
