 <template>
  <div class="rating_container">
    <section class="star_container">
      <svg class="grey_fill" v-for="num in 5" :key="num">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star">
          <symbol id="star" viewBox="0 0 32 32">
            <path
              class="path1"
              d="M16 26.382l-8.16 4.992c-1.5 0.918-2.382 0.264-1.975-1.435l2.226-9.303-7.269-6.218c-1.337-1.143-0.987-2.184 0.755-2.322l9.536-0.758 3.667-8.835c0.674-1.624 1.772-1.613 2.442 0l3.667 8.835 9.536 0.758c1.753 0.139 2.082 1.187 0.755 2.322l-7.269 6.218 2.226 9.303c0.409 1.71-0.485 2.347-1.975 1.435l-8.16-4.992z"
            ></path>
          </symbol>
        </use>
      </svg>
    </section>
    <div :style="'width:' + rating * 100 + '%'" class="star_overflow">
      <section class="star_container">
        <svg class="orange_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star">
            <symbol id="star" viewBox="0 0 32 32">
              <path
                class="path1"
                d="M16 26.382l-8.16 4.992c-1.5 0.918-2.382 0.264-1.975-1.435l2.226-9.303-7.269-6.218c-1.337-1.143-0.987-2.184 0.755-2.322l9.536-0.758 3.667-8.835c0.674-1.624 1.772-1.613 2.442 0l3.667 8.835 9.536 0.758c1.753 0.139 2.082 1.187 0.755 2.322l-7.269 6.218 2.226 9.303c0.409 1.71-0.485 2.347-1.975 1.435l-8.16-4.992z"
              ></path>
            </symbol>
          </use>
        </svg>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    rating: {
      type: Number,
      defailt: 0,
    },
  },
});
</script>

<style lang="scss" scoped>
.rating_container {
  position: relative;
  top: 3px;
  width: 50px;
  .star_overflow {
    overflow: hidden;
    position: relative;
    height: 10px;
  }
  .star_container {
    position: absolute;
    display: flex;
    width: 50px;
    height: 10px;
    top: 0;
    left: 0;
    .grey_fill {
      fill: #d1d1d1;
    }
    .orange_fill {
      fill: #ec6d2d;
    }
  }
}
</style>
