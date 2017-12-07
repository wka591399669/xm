<template>
  <div id="TeamUser">
    <XHeader :left-options="{backText: ''}"> 
     <div @click="show=!show">
         {{topMenu[index].memuName}}
      </div> 
      <div slot="right" @click="queryShow=!queryShow">
       筛选
      </div>
    </XHeader>
    <div class="main">
       <NotFound v-if="!list.length" noHeader='1'></NotFound>
       <ul v-else>
        <li class="title">
          <span>会员类型</span><span>账号</span><span>团队人数</span><span>可用余额</span>
        </li>
        <li v-for="(it,i) in list" :key="i" class="body">
          <span>{{it.userTypeName}}</span><span>{{it.userId}}</span>
          <span>{{it.teamUserCount}}</span><span>{{it.account}}</span>
        </li>  
      </ul>
      <Pages @change="getTeamUserInfo" :startRow="startRow" :pageSize="pageSize" :totalCount="totalCount"></Pages>
    </div>
    <div class="addUserClass" @click="addUserShow=!addUserShow">
       +新增用户
    </div>

    <popup v-model="show" class="menu" position="top" >
      <ul> 
        <router-link :to="`${it.menuUrl}`" tag="li" v-for="(it,i) in topMenu" :key="i">
          <li>{{topMenu[i].memuName}}</li>
        </router-link> 
      </ul> 
    </popup>
    
    <popup v-model="queryShow" class="query" >
      <div class="queryDate">
          <group title="时间">
            <datetime v-model="startDate"  class="selectStartDatetime"></datetime>
            <span class="queryMiddle">—</span>
            <datetime v-model="endDate"   class="selectEndDatetime"></datetime>
          </group>
      </div> 
      <div class="queryUser">下级账号<input type="text" v-model="queryUserId" /></div>
      <div class="userStateClass">
        <span>状态</span>
        <ul>
          <li >
            <span v-for="(it,i) in userStateType" :key="i"  @click="selectUserState(i)" :class="{'select':i==userStateInde}">{{it.stateName}}</span>
          </li>
        </ul>
      </div> 
      <div class="sub" @click="getTeamUserInfo(0)">确定</div>
    </popup>
    
    <popup v-model="addUserShow" class="addUser" > 
      <div>新增用户</div>
      <ul> 
        <li ><span>账号类型</span><span class="textBordClass select">会员</span></li>
        <li ><span>账号</span><span><input type="text" v-model="addUserInfo.lowerUserID" /></span></li>
        <li ><span>密码</span><span><input type="password" v-model="addUserInfo.userPassword" /></span></li>
        <li ><span>重复密码</span><span><input type="password" v-model="addUserInfo.userPasswordCom" /></span></li>
        <li ><span>返点</span>
        <span :class="{'select':addUserInfo.rakeOff=='0.0'}" class="textBordClass" @click="selectRakeOff('0.0')">0.0</span>
        <span :class="{'select':addUserInfo.rakeOff=='0.5'}" class="textBordClass"  @click="selectRakeOff('0.5')">0.5</span></li>
        
      </ul>
      <div><span @click="cannelCreateUser">取消</span><span @click="createLowerUser">确定</span></div>
    </popup>
     
  </div>
</template>
<script>
import NotFound from '../NotFound/NotFound';
import Pages from '../../components/Pages/Pages';
import { Popup, Range, XHeader,Datetime,Group, XButton } from 'vux';
 
export default {
  name: 'TeamSurplus',
  components: {
    Popup,
    Range,
    XHeader,
    NotFound,
    Datetime,
    Group, 
    XButton,
    Pages
  },
  data() {
    return {
      topMenu:[{'memuName':'团队信息',menuUrl:'/teamInfo'},{'memuName':'团队投注',menuUrl:'/teamInfo'},
      {'memuName':'团队帐变',menuUrl:'/teamCashFlow'},{'memuName':'团队盈亏',menuUrl:'/teamSurplus'},
      {'memuName':'用户管理',menuUrl:'/teamUser'},{'memuName':'注册用户',menuUrl:'/teamInfo'}],
      userStateType:[{'stateName':'全部',stateValue:''},{'stateName':'启动',stateValue:'0'},
      {'stateName':'冻结',stateValue:'10'},{'stateName':'锁定',stateValue:'25'},{'stateName':'停用',stateValue:'50'}],
      userStateInde:0,
      show:false,
      queryShow:false,
      addUserShow:false,
      list: [], // info
      startDate:this.DataTime.getDay(-1),
      endDate:this.DataTime.getDay(0),
      index:4,
      queryUserId:'',
      totalCount: 0, // 总条数
      pageSize: 10, // 查询条数
      startRow: 0 ,// 起始条数
      addUserInfo:{
        lowerUserID:'',
        userType:'90',
        userPassword:'',
        userPasswordCom:'',
        rakeOff:'0.0'
      }
     
    };
  },
  async created() {
    this.$vux.loading.show({
      text: 'Loading'
    });
    await this.getTeamUserInfo(); 
    this.$vux.loading.hide();
  },
  methods: {
    async getTeamUserInfo(v) {
      if (v != undefined) {
        this.startRow = v;
      }
      let res = await this.$http('/queryLowerUserInfoForPage', {
        body: {
          startDate: this.startDate.replace(/-/g,''),
          endDate: this.endDate.replace(/-/g,''),
          queryUserId:this.queryUserId,
          userState:this.userStateType[this.userStateInde].stateValue,
          startRow: this.startRow,
          pageSize: this.pageSize
        }
      });
       
      if(this.queryShow){
        this.queryShow=!this.queryShow;
      }
      this.list = res.returnList;
      this.totalCount = res.totalCount;
       
    },
    selectUserState(index){
      this.userStateInde=index;
    },
    selectRakeOff(rakeOffValue){
      this.addUserInfo.rakeOff=rakeOffValue;
    },
    cannelCreateUser(){
       if(this.addUserShow){
        this.addUserShow=!this.addUserShow;
      }
      this.addUserInfo={
        lowerUserID:'',
        userType:'90',
        userPassword:'',
        userPasswordCom:'',
        rakeOff:'0.0'
      }
    },
   async createLowerUser(){ 
      if(this.addUserInfo.lowerUserID == null || this.addUserInfo.lowerUserID.length<=0){
        this.$vux.toast.show({
          text: `账号必填`,
          type: 'warn'
        }); 
        return;
      }

      if(this.addUserInfo.userPassword == null || this.addUserInfo.userPassword.length<=0){
        this.$vux.toast.show({
          text: `密码必填`,
          type: 'warn'
        });
        
        return;
      }
      if(this.addUserInfo.userPasswordCom == null || this.addUserInfo.userPasswordCom.length<=0){
        this.$vux.toast.show({
          text: `确认密码必填`,
          type: 'warn'
        });
        
        return;
      }
      
      if(this.addUserInfo.userPassword != this.addUserInfo.userPasswordCom){
        this.$vux.toast.show({
          text: `密码和确认密码必须一致`,
          type: 'warn'
        });
        return;
      }
      let res = await this.$http('/addLowerUserInfo', {
        body: {
          lowerUserID: this.addUserInfo.lowerUserID,
          password: this.addUserInfo.userPassword,
          confirmPassword:this.addUserInfo.userPasswordCom,
          lowerUserType:this.addUserInfo.userType,
          rakeOff: this.addUserInfo.rakeOff,
          lowerUserName:this.addUserInfo.lowerUserID
        }
      });
       
      if(this.addUserShow){
        this.addUserShow=!this.addUserShow;
      }
      if(res.returnCode=='0000'){
        this.$vux.toast.show({
          text: `新增用户成功`,
          type: 'success'
        });
        this.getTeamUserInfo();
      }else{
        this.$vux.toast.show({
          text: res.returnMessage,
          type: 'warn'
        });
      }
      

    }
  }
};
</script>
<style lang="less">
@import url('./TeamUser.less');
</style>
