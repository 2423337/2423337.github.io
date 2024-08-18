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
    <div style="padding:0 40px">

      <h1 class="title">VidEvent: A Large Dataset for Event Understanding in Videos</h1>
      <p class="description">
        VidEvent is a dataset designed to advance the understanding of complex event structures in videos.
        VidEvent features over 30,000 well-labeled events extracted from 1,110 movie recap videos,
        with comprehensive annotations including event triggers, arguments, and relationships.
        This dataset supports tasks such as video event extraction, localization, relation classification, and script
        event induction. VidEvent include 23,989 events, 80,822 parameters, 17,525 relationships, an average event
        length of 4.5 seconds, and the annotated event duration accounts for about 96% of the total video duration.
      </p>
      <el-image :src="require('@/assets/poster.png')" fit="contain" style="width: 70%;"></el-image>
      <el-divider></el-divider>
      <div class="statistics">
        <h1 class="title">Dataset Features</h1>
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <img src="../assets/combination.svg" alt="" class="content_img">
              <h2>
                Event structure completeness
              </h2>
              <p class="content">
                VidEvent tends to have significantly more events per video, and the
                distribution of its labeled event arguments closely aligns with those in Propbank. This is crucial for
                comprehensive event detection and script event induction tasks. where the goal is to capture the full
                scope of events that constitute the narrative.
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <img src="../assets/对比条形图.svg" alt="" class="content_img">

              <h2>
                Event hierarchical diversity
              </h2>
              <p class="content">
                VidEvent showcases significant event hierarchical diversity, capturing the complexity of event
                structures across multiple levels of abstraction. This diversity is reflected in the dataset's ability
                to represent events ranging from high-level, overarching actions to more granular, detailed sub-events.
                It supports tasks like event relation classification and event localization, where understanding the
                hierarchy and interconnections between events is essential for accurate modeling.
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <img src="../assets/树形图.svg" alt="" class="content_img">

              <h2>
                Dynamic evolution completeness
              </h2>
              <p class="content">
                VidEvent provides the annotations for the dynamic evolution of event through the logic relations among
                different events. VidEvent tends to have more extensive distribution of
                relations in terms of both amount and variety. It has a considerably longer coreference chain,
                enabling tasks such as event sequence prediction and
                dynamic event understanding, where capturing how events unfold and influence each other is critical.
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row class="el-row-number">
          <el-col :span="8">
            <div class="grid-number">
              <h2>
                Video
              </h2>
              <p class="grid-number-desc">
                Number of Videos: 1,110<br>
                Average Video Length: 1 minute 22 seconds
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-number">
              <h2>
                Event
              </h2>
              <p class="grid-number-desc">
                Number of Events: 23,989<br>
                Number of Parameters: 80,822<br>
                Average Event Length: 4.5 seconds<br>
                Annotation Coverage: 96%
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-number">
              <h2>
                Relation
              </h2>
              <p class="grid-number-desc">
                Number of Relationships: 17,525<br>
                Average Event Chain Length: 10.57<br>
                Average Coreference Chain Length: 4.67
              </p>
            </div>
          </el-col>


        </el-row>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage'

}
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

.title {
  margin: 10px 50px 50px 50px;
  font-size: 40px;
}

.description {
  margin: 50px 70px;
  font-size: 20px;
}

.statistics {
  /* height: 300px; */
  padding: 10px 50px 0 50px;
  /* margin: 50px 0 0 0; */
  /* background-color: #bcd4ef; */
}

.content {
  padding-top: 25px;
}

.el-row-number {
  /* margin: 0px 50px; */
}

.grid-content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  /* border-radius: 4px; */
  min-height: 350px;
  margin: 20px 20px;
}

.content_img {
  object-fit: scale-down;
  height: 150px;
  margin: 30px 0;
}

.grid-number {
  height: 130px;
  margin: 50px 30px;
  padding: 30px;
  border-radius: 8px;
  background-color: #bcd4ef;

}

.grid-number-desc {
  margin-top: 20px;
}

.text-center {
  padding: 30px 0;
  background-color: #f8f9fa;
}
</style>