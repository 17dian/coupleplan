
let starDay = new Date();
let endDay = new Date();

let type1 = {
    curTrArr :[],
    preMon:"cpdate-preMon",
    nextMon:"cpdate-nextMon",
    preYear:"cpdate-preYear",
    nextYear:"cpdate-nextYear",
    objTable :"cpdate-table",
    objTitle:"cpdate-month"
}

let type2 = {
    curTrArr :[],
    preMon:"cpdate-preMon2",
    nextMon:"cpdate-nextMon2",
    preYear:"cpdate-preYear2",
    nextYear:"cpdate-nextYear2",
    objTable :"cpdate-table2",
    objTitle:"cpdate-month2"
}

let date = {
  _year : starDay.getFullYear(),
  _month : starDay.getMonth()+1,
  _day : starDay.getDate(),
}

Object.defineProperty(date, 'year', {
  set: function(newValue){
     this._year = newValue;
     showTitle(date,"starDay");
  },
  get: function() {
     return this._year;
  }
});

Object.defineProperty(date, 'month', {
  set: function(newValue){
     this._month = newValue;
     showTitle(date,"starDay");
  },
  get: function() {
     return this._month;
  }
});

Object.defineProperty(date, 'day', {
  set: function(newValue){
     this._day = newValue;
     showTitle(date,"starDay");
  },
  get: function() {
     return this._day;
  }
});


let date2 = {
  _year : endDay.getFullYear(),
  _month : endDay.getMonth()+1,
  _day : endDay.getDate(),
}

Object.defineProperty(date2, 'year', {
  set: function(newValue){
     this._year = newValue;
     showTitle(date2,"endDay");
  },
  get: function() {
     return this._year;
  }
});

Object.defineProperty(date2, 'month', {
  set: function(newValue){
     this._month = newValue;
     showTitle(date2,"endDay");
  },
  get: function() {
     return this._month;
  }
});

Object.defineProperty(date2, 'day', {
  set: function(newValue){
     this._day = newValue;
     showTitle(date2,"endDay");
  },
  get: function() {
     return this._day;
  }
});


init(date,date2,type1,type2);
showTitle(date,"starDay");
showTitle(date2,"endDay");



//初始化
function init(date,date2,type1,type2){
  show(date,type1);
  add( date,type1);
  show(date2,type2);
  add( date2,type2);
}


//标题的渲染函数
function showTitle(date,obj){
  let objDate = document.getElementById(obj);
  objDate.innerHTML = date.year +"年"+ date.month + "月" + date.day + "日";
}

function add(date,type){
  addPreMon(date,type);
  addNextMon(date,type);
  addPreYear(date,type);
  addNextYear(date,type);
  addSelect(date,type);
}

//添加前一个月点击事件事件
function addPreMon(date,type){
  let preMon = document.getElementById(type.preMon);
  preMon.addEventListener("click", function(e){
    if( date.month > 1){
       date.month--;
    }else{
      date.year--;
      date.month = 12;
    }
    show(date,type);
  })
}

//添加下一个月点击事件
function addNextMon(date,type){
  let nextMon = document.getElementById(type.nextMon);
  nextMon.addEventListener("click", function(e){
      if( date.month<12){
         date.month++;
      }else{
        date.year++;
        date.month = 1;
      }
     show(date,type);
  })
}

//添加前一年点击事件
function addPreYear(date,type){
  let preYear = document.getElementById(type.preYear);
  preYear.addEventListener("click", function(e){
    date.year--
    show(date,type);
  })
}

//添加前一年点击事件
function addNextYear(date,type){
  let nextYear = document.getElementById(type.nextYear);
  nextYear.addEventListener("click", function(e){
      date.year++
      show(date,type);
  })
}

//添加选择日期事件
function addSelect(date,type){
  let objTable = document.getElementById(type.objTable);
  objTable.addEventListener("click",function(e){
   if(e.target.nodeName === "TD" && e.target.innerHTML !==""){
     date.day = Number(e.target.innerHTML);
     currentShow(type,date.day)
    }
  })
}

function show(date,type){
  let year = date.year;
  let month = date.month;
  let day = date.day;
  let objMonth = document.getElementById(type.objTitle);
  objMonth.innerHTML =year + "年" + month + "月";
  type.curTrArr = creatDate(date);
  currentShow(type,day);
}


function currentShow(type,day){
   let html = renderDate(type.curTrArr,day,type);
   let objTable = document.getElementById(type.objTable);
   objTable.innerHTML = html;
}



 

// ********************纯函数************************

//创建日期的二维数组;
function creatDate(date){
  let year = date.year;
  let month = date.month;
  let day = date.day;
  let str = year + "-"+ month + "-" + "1";
  let week = new Date(str).getDay();
  let dayCountObj = new Date(year,month,0);
  let dayCount = dayCountObj.getDate();
  let j = 1;
  let trArr = [];
  for (let a = 0; a < 6; a++){
    trArr[a] = [];
    for (let i = 0; i < 7; i++){
      if( (i >= week || a > 0) && j<= dayCount){
           trArr[a][i] = j++;
       }else {
           trArr[a][i] = "";
      }
    }
  } 
  return trArr;
}

//渲染成HTML模版
function renderDate(trArr,day,type){
  let html = "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
  for (let i = 0; i < 6; i++){
   if(i<5||(i == 5 && trArr[i][0]!=='')){
      let template = "";
      for(let n = 0; n < 7; n++){
         if(trArr[i][n] == day){
           template += "<td  class='date-select'>"+trArr[i][n]+"</td>"
         }else {
           template += "<td>"+trArr[i][n]+"</td>"
         }
      }
      templateBox = "<tr>"+template+"</tr>";
      html += templateBox;
   } 
  }
  return html;
}
