const inbox = document.querySelector('.inbox');
const itemsWrapper = document.querySelector('.items-wrapper');
const items = JSON.parse(localStorage.getItem('itemsCheckbox'))|| [];
let lastChecked;

/* ADD ITEMS */
const addItem = inbox.querySelector('.add-item');

let labelIndex = items.length - 1;

function showInHTML(items = [], itemsWrapper) {
  itemsWrapper.innerHTML = items.map((item, i) => {
    return `
      <div class="item">
        <input type="checkbox" id="labelCheckbox${i}" class="item-checkbox" ${item.check? 'checked' : ''} data-index="${i}">
        <label for="labelCheckbox${i}">
          ${item.name}
        </label>
      </div>
    `;
  }).join('');
}

function addCheckbox() {
  labelIndex += 1;

  const labelText = prompt('Add the note label');
  if (labelText === null || labelText.trim().length <= 0) return;

  const itemInputID = 'labelCheckbox' + labelIndex;

  console.log('ADDED: ', itemInputID);

  const item = {
    name: labelText,
    check: false,
    id: itemInputID
  }
  items.push(item);
  showInHTML(items, itemsWrapper);

  localStorage.setItem('itemsCheckbox', JSON.stringify(items));
}


/* CHECK ITEMS */
function toggleCheck(e) {
  if (!e.target.matches('input')) return;
  // if (!e.target.classList.contains('item-checkbox')) return;
  const index = e.target.dataset.index;
  items[index].check = !items[index].check;
  let inBetween = false;
  // console.log(e.target);
  // console.log(this);
  // console.log(items[index].id);

  if (e.ctrlKey && items[index].check) {
    const checkboxesBox = Array.from(itemsWrapper.children);
    const checkboxes = checkboxesBox.map(e => Array.from(e.children)[0]);

    checkboxes.forEach(checkbox => {
      if (checkbox === e.target || checkbox === lastChecked) {  // filtering in between checkbox~
        inBetween = !inBetween;
      }

      if (inBetween) {
        console.log('-inBetween true-');
        console.log('inBetween:', checkbox.id);
        // const index = checkbox.dataset.index;
        // items[index].check = !items[index].check;
        // items[index].checked = true;
        // checkbox.dataset.check = true;
        const findItemById = items.findIndex(item => item.id === checkbox.id);
        checkbox.checked = true;
        items[findItemById].check = true;

        console.log(items[findItemById]);
        console.log(items[2]);
        console.log(document.getElementById(items[2].id).checked);
      }
    });
  }
  lastChecked = e.target;

  localStorage.setItem('itemsCheckbox', JSON.stringify(items));
  // showInHTML(items, itemsWrapper);
}


/* Listening Events */
addItem.addEventListener('click', addCheckbox);
window.addEventListener('keydown', function(e) {
  if (e.keyCode === 187) {
    addCheckbox();
  }
});

// Event Delegation
// el.target.classList.contains('item-checkbox')
// itemsWrapper.addEventListener('click', function(el) {
//   console.log(el.target);
//   if (el.target.matches('input')) {
//     console.log(el.target);   // FIXME: PERBAIKAN EVENT DELEGATION
//     el.target.addEventListener('click', toggleCheck);
//   };
// });
itemsWrapper.addEventListener('click', toggleCheck);

showInHTML(items, itemsWrapper);







/* BEFORE CHANGED: */
// let lastChecked;
//
// function checked(e) {
//   let inBetween = false;
//
//   // Cek ketika kita menekan tombol shift DAN cek ketika kita telah menge-check
//   if (e.ctrlKey && this.checked) {
//     console.log('working!');
//     // const [sample, ...checkboxesBox] = Array.from(itemsWrapper.children);
//     // const checkboxes = checkboxesBox.map(e => Array.from(e.children)[0]);
//     const checkboxesBox = Array.from(itemsWrapper.children);
//     const checkboxes = checkboxesBox.map(e => Array.from(e.children)[0]);
//
//     checkboxes.forEach(checkbox => {
//       if (checkbox === this || checkbox === lastChecked) {  // filtering in between checkbox~
//         inBetween = !inBetween;
//       }
//
//       if (inBetween) {
//         console.log('here!');
//         const index = checkbox.dataset.index;
//         // items[index].check = !items[index].check;
//         items[index].checked = true;
//         console.log(index, items[index]);
//         showInHTML(items, itemsWrapper);
//         // localStorage.setItem('itemsCheckbox', JSON.stringify(items));
//         // checkbox.checked = true;
//       }
//     });
//   }
//
//   lastChecked = this;
// }



// const itemBox = document.createElement('div');
//   itemBox.classList.add('item');
// const itemInput = document.createElement('input');
//   itemInput.type = 'checkbox';
//   itemInput.id = 'labelCheckbox' + labelIndex;
//   itemInput.classList.add('item-checkbox');
// const itemLabel = document.createElement('label');
//   itemLabel.textContent = labelText;
//   itemLabel.setAttribute('for', 'labelCheckbox' + labelIndex);
//
//   itemBox.appendChild(itemInput);
//   itemBox.appendChild(itemLabel);
// itemsWrapper.appendChild(itemBox);
