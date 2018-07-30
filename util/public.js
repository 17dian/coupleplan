var  _util = {
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
          html +=  "<li class = 'list-item'><span>" +  list[i] +  "</span> <span  class = 'delete' data-index = "+i+" data-item = "+item+"> X </span>" +   "</li>";
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
   addBlur :  function (obj,item){
    obj.addEventListener('blur', function(){
      if(obj.value == undefined || obj.value ==""){return null;}
      

      let value  =  _util.getStorage(item);
      let list = (value == null) ? {content : []} : value;
      list.content.push(obj.value);
      _util.setStorage(item,list);
      _util.show( list.content,item);
      obj.value = "";
    })
  }
}
