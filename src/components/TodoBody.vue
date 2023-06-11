<template>
  <div class="container">
    <div class="todo-items">
      <div class="item">
        <div class="circle"></div>
        <div class="todo-info">
          <h4 class="todo-title">运动</h4>
          <p class="todo-desc">备注</p>
          <!--标签-->
          <div class="todo-tags">
            <div class="tags-list">

              <div
                  v-for="tag in dynamicTags"
                  :key="tag"
                  class="todo-tag"
              >
                {{ tag }}
              </div>
            </div>
            <div class="tags-add">#</div>
            <div class="flag"><i class="iconfont icon-flag_px todo-flag"></i></div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="circle"></div>
        <div class="todo-info">
          <h4 class="todo-title">运动</h4>
          <p class="todo-desc">备注</p>
          <!--标签-->
          <div class="todo-tags">
            <div class="tags-list">

              <div
                  v-for="tag in dynamicTags"
                  :key="tag"
                  class="todo-tag"
              >
                {{ tag }}
              </div>
            </div>
            <div class="tags-add">#</div>
            <div class="flag"><i class="iconfont icon-flag_px todo-flag"></i></div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="circle"></div>
        <div class="todo-info">
          <h4 class="todo-title">运动</h4>
          <p class="todo-desc">备注</p>
          <!--标签-->
          <div class="todo-tags">
            <div class="tags-list">

              <div
                  v-for="tag in dynamicTags"
                  :key="tag"
                  class="todo-tag"
              >
                {{ tag }}
              </div>
            </div>
            <div class="tags-add">#</div>
            <div class="flag"><i class="iconfont icon-flag_px todo-flag"></i></div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="circle"></div>
        <div class="todo-info">
          <h4 class="todo-title">吃饭</h4>
          <p class="todo-desc">备注</p>
          <!--标签-->
          <div class="todo-tags">
            <div class="tags-list">

              <div
                  v-for="tag in dynamicTagsEat"
                  :key="tag"
                  class="todo-tag"
              >
                {{ tag }}
              </div>
            </div>
            <div class="tags-add">#</div>
            <div class="flag"><i class="iconfont icon-flag_px todo-flag"></i></div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="circle"></div>
        <div class="todo-info">
          <h4 class="todo-title">吃饭</h4>
          <p class="todo-desc">备注</p>
          <!--标签-->
          <div class="todo-tags">
            <div class="tags-list">

              <div
                  v-for="tag in dynamicTagsEat"
                  :key="tag"
                  class="todo-tag"
              >
                {{ tag }}
              </div>
            </div>
            <div class="tags-add">#</div>
            <div class="flag"><i class="iconfont icon-flag_px todo-flag"></i></div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="circle"></div>
        <div class="todo-info">
          <h4 class="todo-title">吃饭</h4>
          <p class="todo-desc">备注</p>
          <!--标签-->
          <div class="todo-tags">
            <div class="tags-list">

              <div
                  v-for="tag in dynamicTagsEat"
                  :key="tag"
                  class="todo-tag"
              >
                {{ tag }}
              </div>
            </div>
            <div class="tags-add">#</div>
            <div class="flag"><i class="iconfont icon-flag_px todo-flag"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const dynamicTags = ref(['训练', '有氧', '跑步']);
const dynamicTagsEat = ref(['啤酒', '花生', '小烧烤']);

</script>
<style lang="less">
.container {
  .todo-items {
    .item {
      display: flex;

      .circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px dotted #838383;
        margin-right: 15px;
        transform: translateY(3px);
      }

      .todo-info {
        flex: 1;

        .todo-title {
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }

        .todo-desc {
          font-size: 12px;
          color: #999;
          margin: 0;
        }

        .todo-tags {
          display: flex;
          align-items: center;
          font-size: 12px;

          .tags-list {
            display: flex;
            align-items: center;

            .todo-tag {
              display: flex;
              align-items: center;
              margin-right: 10px;
              padding: 2px 5px;
              background-color: #f5f5f5;
            }
          }

          .tags-add {
            color: #858585;
            background-color: #f5f5f5;
            padding: 2px 8px;
            border-radius: 2px;
          }

          .flag {
            margin-left: 10px;

            .todo-flag {
              color: #858585;
              background-color: #f5f5f5;
              padding: 2px 5px;
              border-radius: 2px;
            }
          }

        }

        &:after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background-color: #ececec;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>