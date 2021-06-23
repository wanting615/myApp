<template>
  <div class="rating-content" v-if="ratingScore">
    <div class="rating-card clear">
      <div class="fl">
        <div class="rating-star">{{ ratingScore.overall_score.toFixed(1) }}</div>
        <div>
          <div>高于附近{{ (ratingScore.compare_rating * 100).toFixed(1) }}%的商家</div>
          <div><RatingStar :rating="ratingScore.compare_rating"></RatingStar></div>
        </div>
      </div>
      <ul class="fr">
        <li class="fr">
          <div>配送满意度</div>
          <div class="bold">{{ (ratingScore.service_score * 20).toFixed(1) }}%</div>
        </li>
        <li class="fr">
          <div>包装</div>
          <div class="bold">{{ ratingScore.service_score.toFixed(1) }}</div>
        </li>
        <li class="fr">
          <div>味道</div>
          <div class="bold">{{ ratingScore.food_score.toFixed(1) }}</div>
        </li>
      </ul>
      <ul class="rating-tags">
        <li v-for="(tagItem, index) in ratingTag" :key="index" :class="{ active: activeTag === index }" @click="selectTag(index)">
          <span>{{ tagItem.name }} </span> <span> {{ tagItem.count }}</span>
        </li>
      </ul>
    </div>

    <div class="rating-inner">
      <div class="rating-item" v-for="(item, index) in rating" :key="index">
        <div class="rating-user">
          <img :src="getImgPath(item.avatar)" />
          <div class="rating-name">
            <div>{{ item.username }}</div>
            <div><RatingStar :rating="item.rating_star"></RatingStar></div>
          </div>
          <div class="rating-time">{{ item.rated_at }}</div>
        </div>
        <div class="item-inner">
          <div class="item-food">
            {{ item.rating_text }} {{ item.time_spent_desc }}
            <span v-for="(s, i) in item.item_ratings" :key="i">
              {{ s.food_name }}
            </span>
          </div>
          <div class="rating-img">
            <img :src="getImgPath(s.image_hash)" alt="" v-for="(s, i) in item.item_ratings" :key="i" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import RatingStar from "./rating-star/ratingStar.vue";
import { getRatingAll } from "@/api/shop/shop";
import { RootObject } from "@/interface/rootInterface";
import { Rating, RatingScore, RatingTag, RatingResult } from "@/interface/shopInfoInterface";

export default defineComponent({
  props: {
    shopId: {
      type: String,
      default: "",
    },
  },
  components: {
    RatingStar,
  },
  setup(props) {
    const activeTag = ref(0); //选中的tag
    const ratingData = reactive<{
      rating: Rating[];
      ratingScore: Nullable<RatingScore>;
      ratingTag: RatingTag[];
    }>({
      rating: [], //评价列表
      ratingScore: null, //商店总评分信息
      ratingTag: [], //评价标签
    });
    onMounted(() => {
      //获取 评价列表&商店总评分信息&评价标签
      getRatingAll(props.shopId).then((reasultArr: RootObject<RatingResult>[]) => {
        ratingData.rating = reasultArr[0].data as Rating[];
        ratingData.ratingScore = reasultArr[1].data as RatingScore;
        ratingData.ratingTag = reasultArr[2].data as RatingTag[];
      });
    });
    const selectTag = (index: number) => {
      activeTag.value = index;
    };

    //传递过来的图片地址需要处理后才能正常使用
    const getImgPath = (path: string) => {
      let suffix;
      if (!path) {
        return "//elm.cangdu.org/img/default.jpg";
      }
      if (path.indexOf("jpeg") !== -1) {
        suffix = ".jpeg";
      } else {
        suffix = ".png";
      }
      const url = "/" + path.substr(0, 1) + "/" + path.substr(1, 2) + "/" + path.substr(3) + suffix;
      return "https://fuss10.elemecdn.com" + url;
    };
    return {
      activeTag,
      ...toRefs(ratingData),
      selectTag,
      getImgPath,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./rating.scss";
</style>