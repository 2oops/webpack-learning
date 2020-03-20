// 初始化
function onSearch(){
  getPie()
  getPolar()
  getTable()
}

function render() {
  renderPie().then((data) => {
    console.log(data);
    return renderPolar()
  }).then(data => {
    console.log(data);
    return renderTable()
  }).catch(err => {
    console.log(`err: ${err}`);
  })
}

function getPie() {
  console.log("已获取到图一数据");
  // 获取到图一数据之后立即渲染
  // 请求成功立即渲染
  renderPie()
}

function renderPie() {
  // 渲染完成
  return Promise.resolve("图一渲染完成")
}

function renderPolar() {
  // 渲染完成
  return Promise.reject("图二渲染完成")
}

function renderTable() {
  // 渲染完成
  console.log("图三渲染完成");
}

function getPolar() {
  console.log("已获取到图二数据");
}

function getTable() {
  console.log("已获取到图三数据");
}

onSearch()

render()