reloadList();

function createList() {
  const ordenList = document.getElementById('lista-tarefas');
  const buttonAdd = document.getElementById('criar-tarefa');
  const inputText = document.getElementById('texto-tarefa');

  buttonAdd.addEventListener('click', function () {
    const newItem = document.createElement('li');
    newItem.innerText = inputText.value;
    inputText.value = '';
    ordenList.appendChild(newItem);

    selectedItem(newItem);
    completedItem(newItem);
  });
}
createList();

function removeSelected() {
  const itemList = document.querySelectorAll('li');
  for (let item of itemList) {
    if (item.classList.contains('selected')) {
      item.classList.remove('selected');
    }
  }
}

function selectedItem(item) {
  item.addEventListener('click', function () {
    removeSelected();
    item.classList.add('selected');
  });
}


function completedItem(item) {
  item.addEventListener('dblclick', function () {
    item.classList.toggle('completed');
  });
}

function removeList() {
  const buttonClear = document.getElementById('apaga-tudo');
  const ordenList = document.getElementById('lista-tarefas');
  buttonClear.addEventListener('click', function () {
    const itemList = ordenList.querySelectorAll('li');
    for (let item of itemList) {
      ordenList.removeChild(item);
      localStorage.clear();
    }
  });
}

removeList();

function removeCompletedItem() {
  const buttonClearCompletedItem = document.getElementById('remover-finalizados');
  const ordenList = document.getElementById('lista-tarefas');
  buttonClearCompletedItem.addEventListener('click', function () {
    for (let item of ordenList.querySelectorAll('.completed')) {
      item.remove();
    }
    localStorage.clear();
    saveList();
  });
}

removeCompletedItem();

function saveList() {
  const itemList = document.querySelectorAll('li');
  const objectList = {
    item: [],
    class: []
  }
  for (let item = 0; item < itemList.length; item += 1) {
    objectList.item.push(itemList[item].innerText);
    objectList.class.push(itemList[item].className);
  }
  localStorage.setItem('list', JSON.stringify(objectList));
}

const buttonSaveList = document.getElementById('salvar-tarefas');
buttonSaveList.addEventListener('click', saveList);

function reloadList() {
  if (localStorage.length > 0) {
    const ordenList = document.getElementById('lista-tarefas');
    const objectList = JSON.parse(localStorage.getItem('list'));
    for (let index = 0; index < objectList.item.length; index += 1) {
      const itemList = document.createElement('li');
      itemList.innerText = objectList.item[index];
      itemList.className = objectList.class[index];
      ordenList.appendChild(itemList);
      completedItem(itemList);
      selectedItem(itemList);
    }
  }
}

function moveItemUp() {
  const buttonUp = document.getElementById('mover-cima');
  buttonUp.addEventListener('click', function () {
    const itemList = document.querySelectorAll('li');
    const selectedItemList = document.querySelector('.selected');
    if (selectedItemList !== null) {
      for (let index = 0; index < itemList.length; index += 1) {
        if (selectedItemList.innerHTML === itemList[index].innerHTML) {
          if (index !== 0) {
            let saveInnerHtml = itemList[index].innerHTML;
            let saveClasList = itemList[index].className;
            itemList[index].innerHTML = itemList[index - 1].innerHTML;
            itemList[index].className = itemList[index - 1].className;
            itemList[index - 1].innerHTML = saveInnerHtml;
            itemList[index - 1].className = saveClasList;
          }
        }
      }
    } else {
      alert('Selecione um item para mover!');
    }
  });
}

moveItemUp();

function moveItemDown() {
  const buttonUp = document.getElementById('mover-baixo');
  buttonUp.addEventListener('click', function () {
    const itemList = document.querySelectorAll('li');
    const selectedItemList = document.querySelector('.selected');
    if (selectedItemList !== null) {
      for (let index = 0; index < itemList.length; index += 1) {
        if (selectedItemList.innerHTML === itemList[index].innerHTML) {
          if (index !== (itemList.length - 1)) {
            let saveInnerHtml = itemList[index].innerHTML;
            let saveClasList = itemList[index].className;
            itemList[index].innerHTML = itemList[index + 1].innerHTML;
            itemList[index].className = itemList[index + 1].className;
            itemList[index + 1].innerHTML = saveInnerHtml;
            itemList[index + 1].className = saveClasList;
          }
        }
      }
    } else {
      alert('Selecione um item para mover!');
    }
  });
}

moveItemDown();

function removeSelectedItem() {
  const buttonClearSelectedItem = document.getElementById('remover-selecionado');
  const ordenList = document.getElementById('lista-tarefas');
  buttonClearSelectedItem.addEventListener('click', function () {
    ordenList.querySelector('.selected').remove();
    localStorage.clear();
    saveList();
  });
}

removeSelectedItem();

function removeSelectedClass() {
   const body = document.body;
   const ordenList = document.getElementById('lista-tarefas');
   body.addEventListener('click', function () {
    ordenList.querySelector('.selected').classList.remove('selected');
   });
}

removeSelectedClass();