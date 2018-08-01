var  _util = {
  toDayWeek: function() {
     let today = new Date();
     let weekday = today.getDay();
     let preN = weekday-1;
     let NextN = 7 - weekday;
     let preTime = today.getTime()- (24*60*60*1000) * preN;
     let nextTime = today.getTime() + (24*60*60*1000)* NextN;
     let Monday = new Date(preTime);
     let Sunday = new Date(nextTime)
      return { Monday, Sunday ,weekday}
   },
   dateObject : function(date){
       return new Date(date._year,Number(date._month)-1,date._day)
   },
   dateFormatting : function (date){
     return date.getFullYear()+ "年"+(date.getMonth()+1) + "月" + date.getDate()+"日";
   },
   setStorage :function(item,data){
       let jsonData = JSON.stringify(data);
       localStorage.setItem(item,jsonData);
   },
   getStorage :function(item){
       let data = localStorage.getItem(item);
       if(data == null){ return null };
       return JSON.parse(data);
   },
   delete : function (e){
       let index = e.target.dataset.index;
       let item  = e.target.dataset.item;
       let data  = _util.getStorage(item);
       data.content.splice(index,1);
       _util.setStorage(item,data)
       _util.show(data.content, item);
    },
    listTemplate : function(list,item){
      let html = "";
      if(list.length > 0){
        for (let i = 0; i < list.length; i++) {
          if(list[i].message == undefined){
             html +=  "<li class = 'list-item'><span>" +list[i]+"</span> <span  class = 'delete' data-index = "+i+" data-item = "+item+"> X </span>" + "</li>";
          }else {
             html +=  "<li class = 'list-item'><span>" +list[i].message +" : "+  
                    list[i].date._year +"."+ list[i].date._month + "."+
                    list[i].date._day + " - "+ 
                    list[i].date2._year +"."+ list[i].date2._month + "."+list[i].date2._day+''+
                    "</span> <span  class = 'delete' data-index = "+i+" data-item = "+item+"> X </span>" +   "</li>";
          }
          
        }
      }
      return html;
    },
    addDeleteEvent : function(obj){
        obj.addEventListener("click" , _util.delete)
    },

    addList :function(item,html){
      let str = item + '-list';
      let objList = document.getElementById(str);
      objList.innerHTML = html;
      var objDelete = document.getElementsByClassName("delete");
      for(let i = 0; i < objDelete.length; i++){
         _util.addDeleteEvent(objDelete[i])
      }
    },
    show : function(listArry,item){
      let html = _util.listTemplate(listArry,item);
      _util.addList(item,html);
    },
    initLoad : function(array){
      array.map(function(item){
          let value =  _util.getStorage(item);
          if(value !=  null){
            _util.show(value.content,item)
          }
      })
    },
    //向本地加一个数据
    addItem:function(type,obj){
      let item = {
            date : date,
            date2 : date2,
            message:  obj.value
          };
         let value  =  _util.getStorage(type);
          let list = (value == null) ? {content : []} : value;
          list.content.push(item);
          _util.setStorage(type,list);
          _util.show(list.content,type);
          
    },
    selectDate : function(dateName){
        let objDateName = document.getElementById(dateName);
        objDateName.classList.add("show");
    },
    addBlur :  function (obj,type,dateName){
      obj.addEventListener('blur', function(){
        if(obj.value == undefined || obj.value ==""){return null;}
        _util.selectDate(dateName);
        currentObj = obj;
        currentType = type;
      })
  }
}
