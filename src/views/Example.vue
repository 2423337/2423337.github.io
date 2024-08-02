<template>
  <div>
    <el-menu class="menu" :router="true" mode="horizontal" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">VidEvent</el-menu-item>
      <el-menu-item index="/example" style="margin-left: auto;">Examples</el-menu-item>
      <el-menu-item index="/example">Download</el-menu-item>
      <el-menu-item index="/example">Paper</el-menu-item>
      <el-menu-item index="/example">Code</el-menu-item>
    </el-menu>
    <el-container>
      <el-aside width="30%">
        <el-card shadow="always" style="margin: 10px 10px;">
          <div slot="header">
            <span>select video&nbsp;&nbsp;</span>
            <el-select v-model="selected_videoid" placeholder="select video id" @change="onChangeVideoId">
              <el-option v-for="item in video_ids" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span style="font-size: 20px;">Clip List</span>
          </div>
          <div style="display: flex">
            <el-table :data="originalVideoLabel['clip']" @row-click="eventJump" ref="EventsRef" stripe
              :header-cell-style="{ 'text-align': 'center' }" style="cursor:pointer;margin:0;">
              <el-table-column prop="clipID" label="Clip ID" align="center">
              </el-table-column>
              <el-table-column prop="event" label="Event Trigger" align="center">
              </el-table-column>
              <el-table-column prop="timeStart" label="Start Frame" align="center">
              </el-table-column>
              <el-table-column prop="timeEnd" label="End Frame" align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-aside>

      <el-main>
        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
          :options="playerOptions" />
        <el-card shadow="always" style="margin: 10px 10px;">
          <div>
            <span style="font-size: 20px;">Event Detail</span>
          </div>
          <div style="display: flex">
            <el-table :data="eventDetail" ref="EventsRef" stripe :header-cell-style="{ 'text-align': 'center' }">
              <el-table-column prop="argID" label="argID" align="center" width="120">
              </el-table-column>
              <el-table-column prop="value" label="value" align="center">
              </el-table-column>
              <el-table-column prop="meaning" label="meaning" align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>

      <el-aside width="30%">
        <el-card shadow="always" style="margin: 10px 10px;">
          <div>
            <span style="font-size: 20px;">Event Relation</span>
          </div>
          <div style="display: flex">
            <el-table :data="originalVideoLabel['relation']" ref="EventsRef" stripe
              :header-cell-style="{ 'text-align': 'center' }">
              <el-table-column prop="startClipID" label="Start Clip" align="center" :formatter="startClipFormat">
              </el-table-column>
              <el-table-column prop="endClipID" label="End Clip" align="center" :formatter="endClipFormat">
              </el-table-column>
              <el-table-column prop="relationType" label="Relation Type" align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ExamplePage',
  data() {
    return {
      eventDetail: [],
      video_ids: [],
      selected_videoid: undefined,
      originalVideoLabel: {},
      playerOptions: {
        playbackRates: 1.0, // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'en',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: "https://vjs.zencdn.net/v/oceans.mp4" // url地址
          // src: "https://www.douyin.com/aweme/v1/play/?file_id=1093b200002c44d4b9af4ada3bbf1e29&is_play_url=1&line=0&sign=02597d04ef1bc9c78a19001926f9ab3b&source=PackSourceEnum_AWEME_DETAIL&uifid=c4683e1a43ffa6bc6852097c712d14b81f04bc9b5ca6d30214b0e66b4e385280aec86e7d2d755d10d9d84e1f6752dd3211202f721aa6aa8b5ba372af716b74a516de2beeff942feba2377340ce2d860b6ec9b51d894e7f036ce5ac3cb37d493f7bef39ef2ef2da3d9bd0d123ce657060485b07fe6f0f26f4410e7d1b4927b61e244fd690fa3fc376f42751bb29736557fd93d505ac44721af6afe5a285dd6704&video_id=v0200fg10000c7p4edbc77u0r4hsoqa0&aid=6383"
          // src: "https://v5-coldf.douyinvod.com/9db089c25255626f6b94d8b6d8dc25f6/66ac7fb8/video/tos/cn/tos-cn-ve-15c001-alinc2/oQAgE8Y1c8ZrnueW9bIBk6ADgCDwAXUo0hIeQo/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=1228&bt=1228&cs=0&ds=4&ft=BaXAWVVywSyRKJ80mo~6RXMkWApIzP-wvrKQVXeH2o0g3cI&mime_type=video_mp4&qs=11&rc=PDpkNDw5ZzY6ZzxkNWk0NUBpM3R2NzM6Zmc3OjMzNGkzM0BhXy8tMDAtXmIxYGNhYjRjYSNebGVvcjRfYm1gLS1kLS9zcw%3D%3D&btag=c0010e000ad000&cquery=100y&dy_q=1722577246&l=20240802134046E96C0AF34638EE182D58"
          // src: "https://v5-coldf.douyinvod.com/9db089c25255626f6b94d8b6d8dc25f6/66ac7fb8/video/tos/cn/tos-cn-ve-15c001-alinc2/oQAgE8Y1c8ZrnueW9bIBk6ADgCDwAXUo0hIeQo/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=1228&bt=1228&cs=0&ds=4&ft=BaXAWVVywSyRKJ80mo~6RXMkWApIzP-wvrKQVXeH2o0g3cI&mime_type=video_mp4&qs=11&rc=PDpkNDw5ZzY6ZzxkNWk0NUBpM3R2NzM6Zmc3OjMzNGkzM0BhXy8tMDAtXmIxYGNhYjRjYSNebGVvcjRfYm1gLS1kLS9zcw%3D%3D&btag=c0010e000ad000&cquery=100y&dy_q=1722577246&l=20240802134046E96C0AF34638EE182D58"

        }],
        // poster: "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=600y500", // 你的封面地址
        notSupportedMessage: 'The video is not available now.', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  // 全屏按钮
        }
      }
    }
  },
  created() {
    this.video_ids = (() => {
      const result = []
      for (let index = 1; index <= 10; index++) {
        result.push({
          value: index,
          label: index.toString()
        });
      }
      return result
    })()
  },
  methods: {
    onChangeVideoId() {
      this.$axios({
        method: 'GET',
        url: `http://127.0.0.1:5253/api/video/${this.selected_videoid}`,
      }).then(res => {
        this.originalVideoLabel = res.data;
        console.log(res.data);
        this.playerOptions.sources[0].src = this.originalVideoLabel['video_url'];
      })
    },
    startClipFormat(row) {
      return row.startClipID + ', ' + this.originalVideoLabel['clip'][row.startClipID - 1]['event'];
    },
    endClipFormat(row) {
      return row.endClipID + ', ' + this.originalVideoLabel['clip'][row.endClipID - 1]['event'];
    },
    eventJump(row) {
      this.eventDetail = []
      this.revisingEventID = row['clipID'];
      this.event = this.originalVideoLabel['clip'][row['clipID'] - 1];
      ['arg0_ins',
        'arg1_ins',
        'arg2_ins',
        'arg3_ins',
        'arg4_ins',
        'argM-LOC',
        'argM-EXT',
        'argM-AGT',
        'argM-PAT',
        'argM-INS',
        'argM-STP',
        'argM-EDP'].forEach(argID => {
          let meaning = ''
          switch (argID.slice(3, 8)) {
            case '0_ins':
            case 'M-AGT':
              meaning = 'Agent';
              break;
            case '1_ins':
            case 'M-PAT':
              meaning = 'Patient';
              break;
            case '2_ins':
            case 'M-INS':
              meaning = 'Instrument, Benefactive, Attribute';
              break;
            case '3_ins':
            case 'M-STP':
              meaning = 'Starting Point';
              break;
            case '4_ins':
            case 'M-EDP':
              meaning = 'Ending Point';
              break;
            case 'M-LOC':
              meaning = 'Modifier Location';
              break;
            case 'M-EXT':
              meaning = 'Modifier Extent';
              break;
            default:
              break;
          }
          const value = argID.includes('ins') ? this.event['instance'][argID] : row[argID];
          if (value != null && value != undefined) {
            this.eventDetail.push({ 'argID': argID, 'value': value, 'meaning': meaning })
          }
        })

      const toMillisecond = 1000;
      const timeInSeconds = this.event['timeStart'] / toMillisecond;
      console.log(timeInSeconds);
      this.$refs.videoPlayer.player.currentTime(timeInSeconds);

    }
  }
};
</script>
<style scoped>
.menu {
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  font-size: large;
}

.el-menu-item {
  font-size: 22px;
  font-family: Arial, sans-serif;
}
</style>
