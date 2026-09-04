const SEMESTER_START = new Date(2026, 8, 7); // 2026-09-07，周一
const TOTAL_WEEKS = 18;
const DAYS = ['周一','周二','周三','周四','周五','周六','周日'];
const SECTIONS = [
  ['第一节','08:00～08:45'],['第二节','08:50～09:35'],['第三节','09:50～10:35'],['第四节','10:40～11:25'],['第五节','11:30～12:15'],
  ['第六节','14:05～14:50'],['第七节','14:55～15:40'],['第八节','15:45～16:30'],['第九节','16:40～17:25'],['第十节','17:30～18:15'],
  ['第十一节','18:30～19:15'],['第十二节','19:20～20:05'],['第十三节','20:10～20:55']
];
const STORAGE_KEY = 'local-timetable-2026-fall';
const INITIAL_COURSES = [
  {id:'201400074-02',name:'测量数据处理理论与方法',day:1,startSection:11,endSection:13,startWeek:3,endWeek:13,weekType:'all',location:'',teacher:'袁修孝',note:'教学班：测量数据处理理论与方法02；该课程与《现代测量数据处理理论》合课，上课时间为3-13周星期一[11-13节]。',color:'#4b83c4'},
  {id:'201400086-01',name:'地理信息理论与技术',day:2,startSection:11,endSection:13,startWeek:3,endWeek:13,weekType:'all',location:'',teacher:'卢宾宾',note:'教学班：地理信息理论与技术01；该课程与《地理信息工程与技术》合课，上课时间是3-13周，星期二[11-13节]。',color:'#6c7bd9'},
  {id:'201400134-01',name:'航空航天摄影测量',day:5,startSection:11,endSection:13,startWeek:3,endWeek:13,weekType:'all',location:'3区1-328',teacher:'陶鹏杰',note:'教学班：航空航天摄影测量01；3-13周星期五[11-13节]。',color:'#3b9c9c'},
  {id:'201400388-04',name:'测绘管理与法律法规',day:2,startSection:1,endSection:3,startWeek:3,endWeek:8,weekType:'all',location:'3区1-702',teacher:'周军其',note:'教学班：测绘管理与法律法规04；3-8周星期二[1-3节]。',color:'#d85e71'},
  {id:'201401090-01',name:'图像处理与分析',day:3,startSection:3,endSection:5,startWeek:3,endWeek:13,weekType:'all',location:'3区1-702',teacher:'李林宜',note:'教学班：图像处理与分析01；3-13周星期三[3-5节]。',color:'#4f7cff'},
  {id:'201401706-02',name:'定量遥感技术与应用',day:5,startSection:6,endSection:8,startWeek:3,endWeek:13,weekType:'all',location:'',teacher:'龚龑',note:'教学班：定量遥感技术与应用02；该课程与《定量遥感方法》合课，上课时间是3-13周，星期五[6-8节]。',color:'#e08a3e'},
  {id:'201405985-02',name:'智慧城市',day:1,startSection:6,endSection:8,startWeek:3,endWeek:13,weekType:'all',location:'3区附3-402',teacher:'付仲良',note:'教学班：智慧城市02；3-13周星期一[6-8节]。',color:'#d977a9'},
  {id:'201406053-01',name:'时空大数据分析与数据科学',day:2,startSection:6,endSection:8,startWeek:3,endWeek:13,weekType:'all',location:'',teacher:'张晨晓',note:'教学班：时空大数据分析与数据科学01；原课表显示“未安排周次”，备注明确为3-13周星期二[6-8节]。',color:'#9a69d4'},
  {id:'201600018-02',name:'高分辨率对地观测技术',day:5,startSection:3,endSection:5,startWeek:3,endWeek:13,weekType:'all',location:'3区1-701',teacher:'汪韬阳',note:'教学班：高分辨率对地观测技术02；3-13周星期五[3-5节]。',color:'#27a789'},
  {id:'202101074-0011',name:'论文写作指导',day:1,startSection:2,endSection:4,startWeek:3,endWeek:8,weekType:'all',location:'3区1-701',teacher:'高智',note:'教学班：论文写作指导2042021010740011；3-8周星期一[2-4节]。',color:'#b86b9b'},
  {id:'202101148-01',name:'遥感交叉应用前沿',day:6,startSection:3,endSection:5,startWeek:3,endWeek:13,weekType:'all',location:'3区1-123',teacher:'巫兆聪',note:'教学班：遥感交叉应用前沿01；3-13周星期六[3-5节]。',color:'#ee8a4b'},
  {id:'202101449-01',name:'摄影测量与遥感研究动态',day:6,startSection:11,endSection:13,startWeek:2,endWeek:12,weekType:'all',location:'3区2-112',teacher:'邓非',note:'教学班：摄影测量与遥感研究动态01；2-12周星期六[11-13节]。',color:'#5078e8'},
  {id:'2026118001-26-1',name:'思想政治理论课（硕士2）',day:4,startSection:3,endSection:3,startWeek:1,endWeek:6,weekType:'all',location:'3区1-529',teacher:'李昀柏',note:'教学班：26；1-6周星期四[3节]。',color:'#8a6bb5'},
  {id:'2026118001-26-2',name:'思想政治理论课（硕士2）',day:4,startSection:4,endSection:5,startWeek:1,endWeek:5,weekType:'all',location:'3区1-529',teacher:'李昀柏',note:'教学班：26；1-5周星期四[4-5节]。',color:'#8a6bb5'},
  {id:'2026118002-41',name:'思想政治理论课（硕士1）',day:4,startSection:6,endSection:8,startWeek:1,endWeek:11,weekType:'all',location:'3区1-123',teacher:'王双群',note:'教学班：41；1-11周星期四[6-8节]。',color:'#6574b8'}
];

let courses = loadCourses();
let currentWeekInfo = getCurrentWeekInfo();
let selectedWeek = currentWeekInfo.week;
let mobileDay = currentWeekInfo.weekday;
let deferredInstallPrompt = null;

const $ = id => document.getElementById(id);
const form = $('courseForm');

function uid(){ return 'course-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,8); }
function cloneCourses(data){ return JSON.parse(JSON.stringify(data)); }
function loadCourses(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return cloneCourses(INITIAL_COURSES);
    const parsed = JSON.parse(raw);
    return validateCourses(parsed.courses || parsed);
  }catch(e){ return cloneCourses(INITIAL_COURSES); }
}
function saveCourses(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(courses)); }
function validateCourses(list){
  if(!Array.isArray(list)) throw new Error('课程数据必须是数组。');
  return list.map((c,i)=>{
    const item={...c};
    item.id=String(item.id || uid()); item.name=String(item.name || `课程 ${i+1}`).trim();
    item.day=Number(item.day); item.startSection=Number(item.startSection); item.endSection=Number(item.endSection);
    item.startWeek=Number(item.startWeek); item.endWeek=Number(item.endWeek);
    item.weekType=['all','odd','even'].includes(item.weekType)?item.weekType:'all';
    item.location=String(item.location || ''); item.teacher=String(item.teacher || ''); item.note=String(item.note || '');
    item.color=/^#[0-9a-f]{6}$/i.test(item.color || '')?item.color:'#4f7cff';
    if(!(item.day>=1&&item.day<=7&&item.startSection>=1&&item.endSection<=13&&item.startSection<=item.endSection&&item.startWeek>=1&&item.endWeek<=18&&item.startWeek<=item.endWeek)) throw new Error(`第 ${i+1} 条课程数据无效。`);
    return item;
  });
}
function getCurrentWeekInfo(){
  const now=new Date();
  const start=new Date(SEMESTER_START);
  const diffDays=Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate())-start)/86400000);
  const week=Math.max(1,Math.min(TOTAL_WEEKS,Math.floor(diffDays/7)+1));
  const weekday=diffDays>=0?((diffDays%7)+1):1;
  return {week,weekday};
}
function dateForWeek(week,day){ const d=new Date(SEMESTER_START); d.setDate(d.getDate()+(week-1)*7+(day-1)); return d; }
function fmtDate(d){ return `${d.getMonth()+1}/${d.getDate()}`; }
function courseOccurs(c,w){
  if(w<c.startWeek||w>c.endWeek) return false;
  if(c.weekType==='odd') return w%2===1;
  if(c.weekType==='even') return w%2===0;
  return true;
}
function weekText(c){ return `${c.startWeek}-${c.endWeek}周${c.weekType==='odd'?' · 单周':c.weekType==='even'?' · 双周':''}`; }
function sectionText(c){ return c.startSection===c.endSection?`第${c.startSection}节`:`第${c.startSection}-${c.endSection}节`; }
function metaText(c){ return [sectionText(c),c.location,c.teacher].filter(Boolean).join(' · '); }

function populateOptions(){
  $('courseDay').innerHTML=DAYS.map((d,i)=>`<option value="${i+1}">${d}</option>`).join('');
  const opts=SECTIONS.map((s,i)=>`<option value="${i+1}">${s[0]} · ${s[1]}</option>`).join('');
  $('startSection').innerHTML=opts; $('endSection').innerHTML=opts;
  $('weekSelect').innerHTML=Array.from({length:TOTAL_WEEKS},(_,i)=>`<option value="${i+1}">第 ${i+1} 周</option>`).join('');
}
function render(){
  const info={start:dateForWeek(selectedWeek,1),end:dateForWeek(selectedWeek,7)};
  $('weekTitle').textContent=`第 ${selectedWeek} 周`;
  $('dateRange').textContent=`${fmtDate(info.start)} ～ ${fmtDate(info.end)}`;
  $('weekSelect').value=String(selectedWeek);
  $('termNotice').hidden=selectedWeek>=3;
  if(selectedWeek<3){ $('termNotice').textContent='提示：当前课表中部分课程从第3周开始；第1～2周仅显示有安排的课程。'; }
  renderDesktop(); renderMobile();
}
function renderDesktop(){
  const grid=$('scheduleGrid'); grid.innerHTML='';
  addGridItem(grid,'div','grid-header','节次',1,1);
  DAYS.forEach((d,i)=>addGridItem(grid,'div',`grid-header ${i+1===currentWeekInfo.weekday?'today':''}`,`${d} ${fmtDate(dateForWeek(selectedWeek,i+1))}`,i+2,1));
  SECTIONS.forEach((s,i)=>{ const el=addGridItem(grid,'div','time-label','',1,i+2); el.innerHTML=`<strong>${i+1}</strong><span>${s[1]}</span>`; });
  for(let day=1;day<=7;day++) for(let sec=1;sec<=13;sec++) addGridItem(grid,'div',`grid-cell ${day===currentWeekInfo.weekday?'today-column':''}`,'',day+1,sec+1);
  const shown=courses.filter(c=>courseOccurs(c,selectedWeek));
  shown.forEach(c=>{
    const node=document.createElement('article'); node.className=`course-card ${c.endSection-c.startSection>=2?'has-meta':''}`; node.style.background=c.color;
    node.style.gridColumn=String(c.day+1); node.style.gridRow=`${c.startSection+1} / ${c.endSection+2}`;
    node.title=`${c.name} · ${metaText(c)}`;
    const name=document.createElement('strong'); name.className='course-name'; name.textContent=c.name;
    const loc=document.createElement('span'); loc.className='course-location'; loc.textContent=c.location||sectionText(c);
    const teacher=document.createElement('span'); teacher.className='course-teacher'; teacher.textContent=c.teacher||'';
    node.append(name,loc,teacher); node.addEventListener('click',()=>showCourseDetail(c)); grid.append(node);
  });
  $('emptyHint').hidden=shown.length!==0;
}
function renderMobile(){ renderDesktop(); }
function shortCourseName(name){
  const cleaned=name.replace(/（硕士[12]）/g,'').replace(/与方法|理论与方法/g,'').replace(/技术与应用/g,'').replace(/分析与数据科学/g,'');
  return cleaned.length>10?cleaned.slice(0,10)+'…':cleaned;
}
function showCourseDetail(c){
  const text=[c.name,`${DAYS[c.day-1]} ${sectionText(c)}`,weekText(c),c.location?`地点：${c.location}`:'',c.teacher?`教师：${c.teacher}`:'',c.note].filter(Boolean).join('\n');
  alert(text);
}
function addGridItem(parent,tag,className,text,column,row){ const el=document.createElement(tag); el.className=className; el.textContent=text; el.style.gridColumn=String(column); el.style.gridRow=String(row); parent.append(el); return el; }
function editCourse(id){
  const c=courses.find(x=>x.id===id); if(!c)return;
  $('courseId').value=c.id; $('courseName').value=c.name; $('courseDay').value=c.day; $('startSection').value=c.startSection; $('endSection').value=c.endSection;
  $('startWeek').value=c.startWeek; $('endWeek').value=c.endWeek; $('weekType').value=c.weekType; $('courseLocation').value=c.location; $('courseTeacher').value=c.teacher; $('courseNote').value=c.note; $('courseColor').value=c.color;
  $('formTitle').textContent='编辑课程'; $('resetForm').hidden=false; $('deleteCourse').hidden=false;
  $('courseForm').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function resetForm(){
  form.reset(); $('courseId').value=''; $('courseDay').value='1'; $('startSection').value='1'; $('endSection').value='1'; $('startWeek').value='1'; $('endWeek').value='18'; $('weekType').value='all'; $('courseColor').value='#4f7cff';
  $('formTitle').textContent='添加课程'; $('resetForm').hidden=true; $('deleteCourse').hidden=true;
}
function deleteEditingCourse(){
  const id=$('courseId').value; if(!id)return;
  if(confirm('确定删除这门课程吗？')){ courses=courses.filter(c=>c.id!==id); saveCourses(); resetForm(); render(); }
}
function restoreCourses(){ if(confirm('恢复当前提供的15条课程数据，并覆盖本机当前课表，是否继续？')){ courses=cloneCourses(INITIAL_COURSES); saveCourses(); resetForm(); render(); } }

populateOptions(); resetForm(); render();
$('previousWeek').addEventListener('click',()=>{selectedWeek=Math.max(1,selectedWeek-1);render();});
$('nextWeek').addEventListener('click',()=>{selectedWeek=Math.min(TOTAL_WEEKS,selectedWeek+1);render();});
$('weekSelect').addEventListener('change',e=>{selectedWeek=Number(e.target.value);render();});
$('goCurrentWeek').addEventListener('click',()=>{const x=getCurrentWeekInfo();selectedWeek=x.week;mobileDay=x.weekday;render();});
$('resetForm').addEventListener('click',resetForm); $('deleteCourse').addEventListener('click',deleteEditingCourse); $('restoreCourses').addEventListener('click',restoreCourses);
form.addEventListener('submit',e=>{
  e.preventDefault();
  const c={id:$('courseId').value||uid(),name:$('courseName').value.trim(),day:Number($('courseDay').value),startSection:Number($('startSection').value),endSection:Number($('endSection').value),startWeek:Number($('startWeek').value),endWeek:Number($('endWeek').value),weekType:$('weekType').value,location:$('courseLocation').value.trim(),teacher:$('courseTeacher').value.trim(),note:$('courseNote').value.trim(),color:$('courseColor').value};
  try{ validateCourses([c]); }catch(err){alert(err.message);return;}
  const i=courses.findIndex(x=>x.id===c.id); if(i>=0)courses[i]=c; else courses.push(c); saveCourses(); resetForm(); render();
});
$('exportData').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify({version:1,semesterStart:'2026-09-07',totalWeeks:18,courses},null,2)],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='我的课表-2026秋季.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),500);
});
$('importData').addEventListener('change',async e=>{
  const file=e.target.files[0]; if(!file)return;
  try{ const data=JSON.parse(await file.text()); const imported=validateCourses(data.courses||data); if(confirm(`将导入 ${imported.length} 条课程记录并覆盖当前课表，是否继续？`)){courses=imported;saveCourses();resetForm();render();} }
  catch(err){alert(`导入失败：${err.message}`)} finally{e.target.value='';}
});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e; $('installApp').style.display='flex';});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null; $('installApp').textContent='已安装'; $('installApp').disabled=true;});
(function initInstallButton(){
  const btn=$('installApp');
  btn.style.display='flex';
  if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true){btn.textContent='已安装';btn.disabled=true;}
})();
$('installApp').addEventListener('click',async()=>{
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    try{await deferredInstallPrompt.userChoice;}catch(_){ }
    deferredInstallPrompt=null;
  }else{
    $('installHelp').hidden=false;
  }
});
$('closeInstallHelp').addEventListener('click',()=>{$('installHelp').hidden=true;});
$('installHelp').addEventListener('click',e=>{if(e.target===$('installHelp'))$('installHelp').hidden=true;});

if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
