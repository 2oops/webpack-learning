**Fetch**

优势：更加语义化和简洁，业务逻辑更清晰；基于标准promise实现，支持`async/await`；同构方便

ajax请求json数据

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', url/file,true);
xhr.onreadystatechange = function() {
   if(xhr.readyState==4){
        if(xhr.status==200){
            var data=xhr.responseText;
             console.log(data);
   }
};
xhr.onerror = function() {
  console.log("Oh, error");
};
xhr.send();
```

Fetch请求json数据

```javascript
fetch(url).then(response => response.json())//解析为可读数据
  .then(data => console.log(data))//执行结果是 resolve就调用then方法
  .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
```

