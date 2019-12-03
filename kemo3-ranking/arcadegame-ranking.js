/*! ©SEGA */
'use strict';!function(a){var i={};function n(e){if(i[e])return i[e].exports;var t=i[e]={exports:{},id:e,loaded:!1};return a[e].call(t.exports,t,t.exports,n),t.loaded=!0,t.exports}n.m=a,n.c=i,n.p='',n(0)}([function(e,t,a){var i={data:{page:0,bulk:10,itemsInPage:20},watch:{},computed:{canPrev:function(){return 0<this.page},canNext:function(){return this.page<this.lastPage},lastPage:function(){return Math.ceil(this.filterdList.length/this.itemsInPage)-1}},methods:{prev:function(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1,t=0;t<e;++t)this.canPrev&&--this.page},next:function(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1,t=0;t<e;++t)this.canNext&&++this.page},canShow:function(e){var t=this.page*this.itemsInPage,a=(this.page+1)*this.itemsInPage;return t<=e&&e<a},getFriendsThumb:function(e){return'backgroundImage:url(/storage/arcade-ranking/friends/friends'+e+'.jpg?ver='+this.serverDate+')'}}};Zero.init({mixins:[i],tags:[a(1),a(2)],data:{nowTime:null,nowDate:null,thisYear:null,thisMonth:null,everyMonthLimit:null,startRankingArchiveYear:2019,startRankingArchiveMonth:9,optionData:[],rankingData:[],searchWord:'',rankingName:'',rankingUpdate:'',isRanking:'loading',standby:null},watch:{rankingName:function(e,t){void 0},searchWord:function(){this.page=0},nowDate:function(e,t){},nowTime:function(e,t){}},computed:{filterdList:function(){var t=this;if(this.rankingData)return this.currentPage=0,this.pagerGroupCount=0,this.rankingData.filter(function(e){return''===t.searchWord||e.name.match(t.searchWord)})}},methods:{getDateInfo:function(){var e=this,t=new XMLHttpRequest;t.open('HEAD',window.location.href,!0),t.send(),t.onreadystatechange=function(){4===t.readyState&&(e.nowTime=new Date(t.getResponseHeader('Date')))},this.nowDate=new Date,this.thisYear=this.nowDate.getFullYear(),this.thisMonth=this.nowDate.getMonth(),this.everyMonthLimit=new Date(this.thisYear,this.thisMonth,2,6,59,59),void 0},setDefault:function(){this.rankingData=[],this.page=0,this.isRanking='loading'},getRankingData:function(){var t=this;this.setDefault(),fetch(this.ROOT+'/data/ranking/ranking'+this.rankingName+'.json?ver='+this.serverDate).then(function(e){return e.ok?e.json():Promise.reject(new Error('データを取得できません。'))}).then(function(e){t.rankingData=e.ranking,t.rankingUpdate=e.date,t.isRanking='ok'}).catch(function(e){void 0,t.isRanking='error'})},optionMaker:function(){for(var e=0;;){var t=new Date(this.startRankingArchiveYear,this.startRankingArchiveMonth-1+e,2,6,59,59);if(t>=this.everyMonthLimit){void 0,void 0;break}void 0,void 0;var a=t.getFullYear(),i=t.getMonth()+1;a=a.toString().padStart(2,'0'),i=i.toString().padStart(2,'0'),this.optionData.unshift({y:a,m:i}),e++,void 0}this.everyMonthLimit>this.nowDate&&(void 0,this.optionData.shift()),this.optionData.unshift({m:'',y:''})},rankingChange:function(e){e.target.value?this.rankingName='-'+e.target.value:this.rankingName=e.target.value,this.searchWord='',this.getRankingData()}},created:function(){var e=this;this.getDateInfo(),setTimeout(function(){e.getRankingData(),e.optionMaker()},500)},template:a(3)})},function(e,t){e.exports='<tag name=localnav props=data> <kemositearcadelocalnavwrap :data=data> <kemositecontent type=transparent> <span class=kemo-site-arcade-LocalNav-machine :data-page=PAGENAME></span> </kemositecontent> <kemositelocalnav :data=data scene=arcadegame titlelogo=logo_arcade.png url=arcadegame /> </kemositearcadelocalnavwrap> </tag> '},function(e,t){e.exports='<tag name=rankingcategory> <div> <ul class=kemo-site-Arcade-Ranking-categoryWrap> <li class="kemo-site-Arcade-Ranking-category Rank"> <span v-for="item in arrayTextMaker(\'じゅんい\')">{{item}}</span> </li> <li class="kemo-site-Arcade-Ranking-category Friends"> <span v-for="item in arrayTextMaker(\'なかよしフレンズ\')">{{item}}</span> </li> <li class="kemo-site-Arcade-Ranking-category Player"> <span v-for="item in arrayTextMaker(\'ランク・なまえ\')">{{item}}</span> </li> <li class="kemo-site-Arcade-Ranking-category Score"> <span v-for="item in arrayTextMaker(\'スコア\')">{{item}}</span> </li> </ul> </div> </tag> '},function(e,t){e.exports='<section class=kemo-site-Arcade-Ranking> <kemositeundervisual/> <localnav :data=localNavData /> <kemositecontent type=transparent> <kemositeheadingh2under title=ランキング titlee=ArcadeRanking bordercolor=brown /> <div class=kemo-site-SortArea v-if="PAGENAME!==\'root\'"> <div class=kemo-site-SortArea-searchBox> <div class="kemo-site-SortArea-searchName middleText">ランキング選択</div> <div class="kemo-site-SortArea-PullDown marginSmall"> <select class=kemo-site-ranking-Select @change=rankingChange> <option v-for="(item, index) in optionData" :value=[item.y+item.m]> <template v-if="item.y===\'\' && item.m===\'\'">最新のランキング</template> <template v-else>{{item.y}}年{{item.m}}月</template> </option> </select> </div> </div> <div class=kemo-site-SortArea-searchBox> <div class="kemo-site-SortArea-searchName middleText">なまえで検索</div> <div class=kemo-site-TextArea> <input type=text v-model=searchWord placeholder=ユーザーのなまえを入力> </div> </div> </div> </kemositecontent> <div class="kemo-site-pager-wrap marginSmall" v-if="filterdList.length!==0"> <button class=kemo-site-pager-doubleArrow @click=prev(bulk) :disabled=!canPrev> </button> <button class=kemo-site-pager-Arrow @click=prev() :disabled=!canPrev> </button> <div class=kemo-site-pager-counter> <kemositesplitenumber :number=page+1 use=brown /> <div class="kemo-site-SpliteNumbers brown"> <span class=num-slash>/</span> </div> <kemositesplitenumber :number=lastPage+1 use=brown /> </div> <button class="kemo-site-pager-Arrow alternate" @click=next() :disabled=!canNext> </button> <button class="kemo-site-pager-doubleArrow alternate" @click=next(bulk) :disabled=!canNext> </button> </div> <div class=kemo-site-Arcade-Ranking-Content> <kemositewavebg color=#0e88c1 wavecolortop=#0e88c1 wavecolorbottom=#0974cf slashcolor=#0974cf :top=true :bottom=true> <div class=kemo-site-Arcade-Ranking-List> <div class="kemo-site-SortArea-noItem white" v-if="isRanking===\'loading\'"> データを取得中です… </div> <div class="kemo-site-SortArea-noItem white" v-else-if="isRanking===\'error\'"> ランキングデータがありません </div> <div v-else class=kemo-site-Arcade-Ranking-Area> <div v-if=filterdList> <aside class=kemo-site-Arcade-Ranking-updateTime> 最終更新日時：{{rankingUpdate}}<br>ランキングは1日1回更新されます </aside> <rankingcategory/> <div class="kemo-site-SortArea-noItem white" v-if="isRanking===\'ok\' && filterdList.length === 0"> お探しのユーザーは見つかりませんでした </div> <div class=kemo-site-Arcade-Ranking-Bg :class="\'ranking\' + item.order" v-for="(item, index) in filterdList" v-if=canShow(index)> <ul> <li class=Rank :class=item.order> <div class=GreenRankNum> <kemositesplitenumber :number=String(item.order) use=green /> </div> <div v-if="item.order < 2"> <kemositeflash num=6 /> </div> <div v-if="item.order < 4" class=Crown> <span :class="\'grade-\'+item.order"></span> </div> <div class=GreenRankUnit> <div class="kemo-site-SpliteNumbers green"> <span class=num-unit>位</span> </div> </div> </li> <li class=Friends :style=getFriendsThumb(item.bfID)> </li> <li class=Player> <ul> <li class=RankNum> <div class=rankText> <span v-for="item in arrayTextMaker(\'ランク\')"> {{item}} </span> </div> <kemositesplitenumber :number=String(item.rank) use=rank /> </li> <li class=Name>{{item.name}}</li> </ul> </li> <li class=Score> <kemositesplitenumber :number=String(item.score) use=brown /> </li> </ul> </div> </div> </div> </div> </kemositewavebg> </div> <div class="kemo-site-pager-wrap marginLarger" v-if="filterdList.length!==0"> <button class=kemo-site-pager-doubleArrow @click=prev(bulk) :disabled=!canPrev> </button> <button class=kemo-site-pager-Arrow @click=prev() :disabled=!canPrev> </button> <div class=kemo-site-pager-counter> <kemositesplitenumber :number=page+1 use=brown /> <div class="kemo-site-SpliteNumbers brown"> <span class=num-slash>/</span> </div> <kemositesplitenumber :number=lastPage+1 use=brown /> </div> <button class="kemo-site-pager-Arrow alternate" @click=next() :disabled=!canNext> </button> <button class="kemo-site-pager-doubleArrow alternate" @click=next(bulk) :disabled=!canNext> </button> </div> </section> '}]);