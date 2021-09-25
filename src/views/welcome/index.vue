<template>
  <div class="elcss">
    <div class="img">
      <img src="../../assets/img/logo.png">
    </div>
    <div class="minn">
      <div class="title">
        <div class="welcom">{{username}} :欢迎使用内部信息化平台</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Cookie,
  Key
} from '~/utils/cookie';
export default {
  computed: {
    username () {
      return JSON.parse(Cookie.get(Key.userInfoKey)).nickName;
    }
  }
};
</script>

<style>

.el-scrollbar__view {
    height: 100% !important;
}

.el-scrollbar__view>.elcss {
  width: 100%;
  height: 100%;
  padding: 180px;
  background-color: rgba(25, 158, 216, 0.529411764705882) !important;

}
.minn {
  margin-top: -5%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
	align-items: center;
}
.img {
  position: absolute;
  top: 30px;
  left: 30px;
}
img {
  width: 200px;
}

.titel {
  font-family: 'Arial Negreta', 'Arial';
      font-weight: 700;
      margin-right: 50%;
}

.welcom {
  font-size: 48px;
}

.el-row {
  text-align: center;
}

.buttonin {
  width: 218px;
  height: 58px;
  font-size: 20px;
  border-radius: 90px;
  font-weight: 500;
  font-family: 'Arial Negreta', 'Arial';
  color: black;
}

</style>
