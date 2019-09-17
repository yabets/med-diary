// ##################################################### //

// helper functions

const removeClass = (node, name) => {
  node.classList.remove(name);
};

const addClass = (node, name) => {
  node.classList.add(name);
};

const showClass = (...nodes) => nodes.forEach((node) => removeClass(node, 'hidden'));


const hideClass = (...nodes) => nodes.forEach((node) => addClass(node, 'hidden'));

// ##################################################### //


const newDiary = document.querySelector('#newDiary');

const newForm = () => {
  const ulForRecords = document.querySelector('#ul-for-records');
  const listRecordContainer = document.querySelector('#list-records-container');
  const form = document.querySelector('#form');
  const save = document.querySelector('#create-submit');


  // create one list
  const li = document.createElement('LI');
  const div = document.createElement('DIV');
  const span = document.createElement('SPAN');

  const liCopy = li.cloneNode();
  liCopy.classList.add('card');
  const divCopy = div.cloneNode();
  divCopy.classList.add('flex-columns');

  const divCopy1 = div.cloneNode();
  divCopy1.classList.add('row', 'spread');
  const spanCopy = span.cloneNode();
  spanCopy.classList.add('subject');
  const spanCopy1 = span.cloneNode();
  spanCopy1.classList.add('timestamp', 'float-right');
  divCopy1.appendChild(spanCopy);
  divCopy1.appendChild(spanCopy1);
  divCopy.appendChild(divCopy1);

  const divCopy2 = div.cloneNode();
  divCopy2.classList.add('row');
  const spanCopy2 = span.cloneNode();
  spanCopy2.classList.add('highlight');
  divCopy2.appendChild(spanCopy2);
  divCopy.appendChild(divCopy2);

  liCopy.appendChild(divCopy);
  ulForRecords.appendChild(liCopy);


  // check size of browser and render accordingly
  const mediaQuery = window.matchMedia('(max-width: 700px)'); // on mobile
  if (mediaQuery.matches) {
    hideClass(listRecordContainer);
    showClass(form);
  } else {
    showClass(listRecordContainer);
    showClass(form);
  }

  // callback for save button for form
  const acceptFrom = () => {
    const subject = document.querySelector('#subject');
    const description = document.querySelector('#description');
    const date = document.querySelector('#date');

    const lastLi = ulForRecords.lastElementChild;

    const subjectValue = subject.value;
    const descriptionValue = description.value;
    const dateValue = date.value;

    if (subjectValue !== '' && descriptionValue !== '' && dateValue !== '') {
      // const span
      const sub = lastLi.querySelector('.subject');
      const time = lastLi.querySelector('.timestamp');
      const desc = lastLi.querySelector('.highlight');

      sub.textContent = `Subject ${subjectValue}`;
      time.textContent = dateValue;
      desc.textContent = descriptionValue;

      hideClass(form);
      showClass(listRecordContainer);
    } else {
      alert('wrong inputs');
    }
  };


  save.addEventListener('click', acceptFrom);
};

newDiary.addEventListener('click', newForm);
