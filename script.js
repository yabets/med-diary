
(() => {
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
  let currentLi;
  const newDiary = document.querySelector('#newDiary');
  const form = document.querySelector('#create');
  const ulForRecords = document.querySelector('#ul-for-records');

  const edit = (evt) => {
    // show form and set the currentLi value
    form.classList.remove('hide');
    currentLi = evt.srcElement;
  };

  const makeResponsive = (onCreate) => {
    const listRecordContainer = document.querySelector('#list-records-container');
    const detail = document.querySelector('#detail');
    const mediaQuery = window.matchMedia('(max-width: 700px)'); // on mobile
    if (mediaQuery.matches) {
      if (onCreate) {
        hideClass(listRecordContainer);
        showClass(detail);
      } else {
        hideClass(detail);
        showClass(listRecordContainer);
      }
    } else {
      showClass(listRecordContainer);
      showClass(detail);
    }
  };

  const makeLi = () => {
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
    liCopy.addEventListener('click', edit);

    return liCopy;
  };

  const newForm = () => {
    // show form and set the currentLi value
    form.classList.remove('hide');
    makeResponsive(true);
  };

  newDiary.addEventListener('click', newForm);

  const save = document.querySelector('#create-submit');

  const recordInList = (values) => {
    const { subject, description, date } = values;
    const sub = currentLi.querySelector('.subject');
    const time = currentLi.querySelector('.timestamp');
    const desc = currentLi.querySelector('.highlight');

    sub.textContent = `Subject: ${subject}`;
    time.textContent = date;
    desc.textContent = description;

    form.classList.add('hide');
  };

  // callback for save button for form
  const saveForm = () => {
    const subject = document.querySelector('#subject');
    const description = document.querySelector('#description');
    const date = document.querySelector('#date');

    const subjectValue = subject.value;
    const descriptionValue = description.value;
    const dateValue = date.value;

    if (subjectValue !== '' && descriptionValue !== '' && dateValue !== '') {
      subject.value = '';
      description.value = '';
      date.value = '';
      makeResponsive(false);
      currentLi = makeLi();
      recordInList({ subject: subjectValue, description: descriptionValue, date: dateValue });
      ulForRecords.appendChild(currentLi);
    } else {
      alert('wrong inputs');
    }
  };

  save.addEventListener('click', saveForm);
})();
