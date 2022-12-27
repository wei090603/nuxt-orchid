<template>
  <div class="form-box">
    <div :class="[{ focused: focused }, 'input-box']">
      <div
        contenteditable="true"
        spellcheck="false"
        placeholder="来发一针见血的评论吧!"
        @blur="handleInputBlur"
        @input="handleInputEvent"
        @focus="handleFocusInput"
        disabled="disabled"
        :class="[{ empty: placeholder }, 'rich-input']"
        v-text="content"
      ></div>
    </div>
  </div>
  <div class="action-box">
    <div class="emoji-container emoji-btn">表情包</div>
    <div class="submit">
      <n-button type="primary" @click="emits('handleCommentClick')" :disabled="placeholder">
        发表评论
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  content: string;
  focused: boolean;
  placeholder: boolean;
}

const props = withDefaults(defineProps<IProps>(), {});

const emits = defineEmits([
  'handleCommentClick',
  'update:content',
  'update:focused',
  'update:placeholder',
]);

const handleInputEvent = (event: any) => {
  emits('update:placeholder', !event.target.innerHTML);
};

const handleFocusInput = () => {
  emits('update:focused', true);
};

const handleInputBlur = (event: any) => {
  emits('update:focused', !!event.target.innerHTML);
  emits('update:content', event.target.innerHTML);
};
</script>

<style lang="less" scoped>
.form-box {
  width: 100%;
  height: 100%;
  .input-box {
    font-size: 0;
    transition: all 0.3s;
    background: #f2f3f5;
    border: 1px solid #f2f3f5;
    border-radius: 4px;
    position: relative;
    &.focused {
      border-color: var(--Yuexing-color);
      background: #fff;
    }
    .rich-input {
      position: relative;
      padding: 8px 12px;
      color: #252933;
      outline: none;
      min-height: 64px;
      box-sizing: border-box;
      line-height: 22px;
      font-size: 14px;
      resize: both;
      &.empty {
        &::before {
          content: attr(placeholder);
          position: absolute;
          pointer-events: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: #8a919f;
        }
      }
    }
  }
}
.action-box {
  display: flex;
  align-items: center;
  margin-top: 8px;
  .submit {
    flex: 0 0 auto;
    margin-left: auto;
  }
}
</style>
