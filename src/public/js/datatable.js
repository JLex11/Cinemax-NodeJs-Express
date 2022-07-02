// eslint-disable-next-line no-unused-vars
class DataTable {
  documentBody;
  elementParent;
  container_subsection;
  container_table;
  container_buttons;
  section_subbody;
  container_section_subtitle;

  tableName;
  titulo;
  titleIcon;
  headers;
  tableFields;
  describe;
  trs;
  contNewRows;

  table;
  thead;
  tbody;
  container_rows_actions;

  indexUltElement;
  numRowsPerPage;
  actualPage;
  cantRows;

  ls;

  constructor(elementParent, contents) {
    this.documentBody = document.querySelector('body');
    this.elementParent = document.querySelector(elementParent);
    this.tableName = contents.name;
    this.titulo = this.capitalizarString(contents.titulo);
    this.titleIcon = contents.titleIcon;
    this.requestRoutes = contents.requestRoutes;
    this.nameTablesRoutes = Object.keys(this.requestRoutes);

    this.makeTable();
  }

  async tableRequest(table, id, method, datos) {
    table = table ? table : this.tableName;
    let route = this.requestRoutes[table] ? this.requestRoutes[table] : this.requestRoutes[this.tableName];
    route += id ? id : '';
    datos = datos ? datos : { null: 'null' };

    let requestContent = {};

    if (method == 'POST') {
      requestContent = {
        method: method,
        body: datos,
      };
    } else {
      requestContent = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    try {
      let response = await fetch(route, requestContent);
      return await response.json();
    } catch (error) {
      console.log('Ha ocurrido un error: ' + error);
    }
  }

  async makeTable() {
    this.trs = await this.tableRequest();
    this.describe = await this.tableRequest('', 'describe');
    this.headers = Object.getOwnPropertyNames(this.trs[0]);
    this.headers = this.headers.map(header => {
      return this.capitalizarString(this.replaceCharacter(header, '_', ' '));
    });

    this.ls = window.localStorage;

    this.container_subsection = document.createElement('div');
    this.container_section_subtitle = document.createElement('div');
    this.section_subbody = document.createElement('div');
    this.container_table = document.createElement('div');
    this.container_buttons = document.createElement('div');
    this.container_rows_actions = document.createElement('div');
    this.table = document.createElement('table');
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    this.contNewRows = this.ls.getItem(this.tableName + '_contNewRows') ? this.ls.getItem(this.tableName + '_contNewRows') : 0;

    this.indexUltElement = 0;
    this.numRowsPerPage = this.ls.getItem(`numRowsPerPage${this.titulo}`) > 0 ? this.ls.getItem(`numRowsPerPage${this.titulo}`) : 1;
    this.actualPage = 1;
    this.cantRows = this.trs.length;

    this.renderTable();
  }

  renderTable() {
    this.renderTitleBar();
    this.renderActionBtns();
    this.renderHeaders();
    this.renderTrs();
    this.renderRowActions();
    this.changeNumRowsPerPage();

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);

    this.container_table.appendChild(this.table);
    this.container_table.classList.add('container_table');

    this.container_buttons.classList.add('container_buttons');

    this.container_rows_actions.classList.add('container_rows_actions');

    this.section_subbody.append(this.container_buttons, this.container_table, this.container_rows_actions);
    this.section_subbody.classList.add('section_subbody');

    this.container_subsection.append(this.container_section_subtitle, this.section_subbody);
    this.container_subsection.classList.add('container_subsection');
    this.container_subsection.id = this.titulo;

    this.elementParent.appendChild(this.container_subsection);
  }

  renderTitleBar() {
    this.container_section_subtitle.innerHTML = `
        <div class="section_subtitle">
            <h2>${this.titulo}</h2>
            <div>
                <span class="material-icons-round">${this.titleIcon}</span>
                <h2 class="contRows">${this.cantRows}</h2>
            </div>
        </div>
        `;
  }

  renderActionBtns() {
    const buttonsId = ['btn_add', 'btn_edit', 'btn_delete'];
    const buttonsIcon = ['add', 'edit', 'delete'];
    const buttonsFunctions = [
      () => {
        this.agregarFilas();
      },
      () => {
        let checkBox = this.container_table.querySelectorAll('input[type=checkbox]');
        checkBox.forEach(check => {
          if (check.checked) {
            let fila = check.parentNode.parentNode;
            this.editarFilas(fila.childNodes);
          }
        });
      },
      () => {
        let checkBox = this.container_table.querySelectorAll('input[type=checkbox]');
        checkBox.forEach(check => {
          if (check.checked) {
            let fila = check.parentNode.parentNode;
            check.checked = false;
            this.eliminarFila(fila);
          }
        });
      },
    ];

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < buttonsId.length; i++) {
      let divBtn = document.createElement('div');
      divBtn.innerHTML = `<span class="material-icons-round">${buttonsIcon[i]}</span>`;
      divBtn.id = buttonsId[i];
      divBtn.classList.add('btns');
      divBtn.addEventListener('click', buttonsFunctions[i], { passive: true });

      fragment.appendChild(divBtn);
    }
    this.container_buttons.appendChild(fragment);
  }

  renderModal(body) {
    let modalTitle = 'Modal Title';

    let containerModal = document.createElement('div');
    let containerHeader = document.createElement('div');

    containerModal.classList.add('modal-container');
    containerHeader.classList.add('modal-header');

    function renderHeader() {
      let headerContent = document.createElement('div');
      headerContent.classList.add('header-content');

      function renderTitle() {
        let divModalTitle = document.createElement('div');
        divModalTitle.classList.add('modal-title');

        let h3Title = document.createElement('h3');
        h3Title.textContent = modalTitle;

        divModalTitle.append(h3Title);
        return divModalTitle;
      }

      function renderActions() {
        let divModalActions = document.createElement('div');
        divModalActions.classList.add('modal-actions');

        let spanCloseButton = document.createElement('span');
        spanCloseButton.classList.add('material-icons-round');
        spanCloseButton.textContent = 'close';
        spanCloseButton.addEventListener(
          'click',
          () => {
            containerModal.remove();
          },
          { passive: true }
        );

        divModalActions.append(spanCloseButton);
        return divModalActions;
      }

      headerContent.append(renderTitle(), renderActions());
      return headerContent;
    }

    function renderBody() {
      let bodyContent = document.createElement('div');
      bodyContent.classList.add('body-content');
      bodyContent.append(body);
      return bodyContent;
    }

    containerModal.append(renderHeader(), renderBody());
    this.section_subbody.append(containerModal);
  }

  renderHeaders() {
    let tr = document.createElement('tr');
    let dFragment = document.createDocumentFragment();
    let th = document.createElement('th');
    tr.appendChild(th);

    this.headers.forEach(header => {
      let th = document.createElement('th');
      th.textContent = header;
      dFragment.appendChild(th);
    });
    tr.appendChild(dFragment);
    this.thead.appendChild(tr);
  }

  renderTrs() {
    let dFragment = document.createDocumentFragment();
    let rows = 0;
    for (let i = this.indexUltElement; i < this.cantRows; i++) {
      if (this.trs[i]) {
        let t = this.trs[i];
        let rowId = `${t[Object.keys(t)[0]]}-${this.tableName}`;
        let checkBoxId = `${t[Object.keys(t)[0]]}-${this.titulo}`;

        let tr = document.createElement('tr');
        tr.id = rowId;

        let td = document.createElement('td');
        td.innerHTML = `
                <input type="checkbox" id="${checkBoxId}" class="table_check">
                <label for="${checkBoxId}">
                    <div class="custom_checkbox" id="custom_checkbox"></div>
                </label>`;
        tr.append(td);

        let describeCont = 0;
        for (let i in t) {
          let td = document.createElement('td');
          let describe = this.describe[describeCont] ? this.describe[describeCont] : false;
          if (describe && describe.Field == 'foto') {
            let ahref = document.createElement('a');
            ahref.setAttribute('target', '_blank');
            ahref.href = t[i];

            let img = document.createElement('img');
            img.src = t[i];
            img.setAttribute('loading', 'lazy');
            img.addEventListener(
              'error',
              () => {
                td.innerHTML = `
                            <span class="material-icons-round" style="color: gray;">image_not_supported</span>`;
              },
              { passive: true }
            );

            ahref.appendChild(img);
            td.appendChild(ahref);
          } else if (describe && describe.Field == 'estado') {
            td.textContent = t[i];
            if (t[i] == 'T') {
              td.classList.add('estado_activo');
            } else {
              td.classList.add('estado_inactivo');
            }
          } else {
            td.textContent = t[i];
          }
          describeCont++;
          tr.appendChild(td);
        }
        dFragment.appendChild(tr);
      }
      rows++;
      if (rows == this.numRowsPerPage) break;
    }
    this.tbody.innerHTML = '';
    this.tbody.appendChild(dFragment);
  }

  renderRowActions() {
    let numPages = Math.ceil(this.cantRows / this.numRowsPerPage);
    while (this.actualPage > numPages) {
      this.actualPage--;
    }

    let container_pages_number = document.createElement('div');
    container_pages_number.classList.add('container_pages_number');
    container_pages_number.innerHTML += '<p>Mostrando</p>';

    let inputNumRows = document.createElement('input');
    inputNumRows.setAttribute('type', 'number');
    inputNumRows.setAttribute('value', this.numRowsPerPage);
    inputNumRows.setAttribute('max', this.cantRows);
    inputNumRows.setAttribute('min', 1);

    let buttonChangeRows = document.createElement('span');
    buttonChangeRows.classList.add('material-icons-round');
    buttonChangeRows.textContent = 'arrow_right';

    container_pages_number.append(inputNumRows, buttonChangeRows);
    container_pages_number.innerHTML += `<p>de ${this.cantRows}</p>`;
    this.changeNumRowsPerPage(container_pages_number);

    let container_pages_nav = document.createElement('div');
    container_pages_nav.classList.add('container_pages_nav');
    container_pages_nav.innerHTML = `
    <ul>
        ${this.actualPage > 2 ? '<li>' + (this.actualPage - 2) + '</li>' : ''}
        ${this.actualPage > 1 ? '<li>' + (this.actualPage - 1) + '</li>' : ''}
        <li class="actualPage_indicator">${this.actualPage}</li>
        ${this.actualPage < numPages - 1 ? '<li>' + (this.actualPage + 1) + '</li>' : ''}
        ${numPages - this.actualPage > 2 ? '<li>...</li>' : ''}
        ${numPages != this.actualPage ? '<li>' + numPages + '</li>' : ''}
        ${this.actualPage > 1 ? '<li data-type="rowRight"><span class="material-icons-round">chevron_left</span></li>' : ''}
        ${numPages - this.actualPage > 0 ? '<li data-type="rowLeft"><span class="material-icons-round">chevron_right</span></li>' : ''}
    </ul>`;

    this.container_rows_actions.innerHTML = '';
    this.container_rows_actions.append(container_pages_number, container_pages_nav);
    this.moveInRows(container_pages_nav);
  }

  renderForm(inputValues) {
    let form = document.createElement('form');
    form.setAttribute('enctype', 'multipart/form-data');

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < this.describe.length; i++) {
      let describeType = ['text', '11'];
      let disabled = false;

      let input = document.createElement('input');
      inputValues ? (input.value = inputValues[i+1].innerText) : (input.value = '');
      input.name = this.describe[i] ? this.describe[i].Field : this.headers[i];
      input.placeholder = this.headers[i] ? this.headers[i] : '';

      if (this.describe[i]) {
        describeType = this.stringToArray(this.describe[i].Type, ' ', '(', ')');

        if (this.describe[i].Key == 'PRI') {
          disabled = true;
          form.id = input.value;
        } else {
          disabled = false;
        }

        if (this.describe[i].Field == 'foto') {
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
        } else {
          input.setAttribute('type', describeType[0]);
          input.setAttribute('max-lenght', describeType[1]);
        }
      }
      if (disabled) input.setAttribute('disabled', 'disabled');

      fragment.appendChild(input);
    }
    form.append(fragment);
    return form;
  }

  renderSaveFormBtn(form, action, buttonName) {
    let saveBtn = document.createElement('div');
    saveBtn.innerHTML = `<button class="btn_actualizar">${buttonName} ${this.tableName}</button>`;
    saveBtn.addEventListener(
      'click',
      async () => {
        let formData = new FormData(form);
        this.trs = await this.tableRequest(null, `${action}/${form.id}`, 'POST', formData);
        this.renderTrs();
        this.renderTitleBar();
        this.renderRowActions();
        //cuando tengo varios modals y quiero que se cierre el modal que estoy abriendo, 
        //este es el metodo que se ejecuta para cerrar el modal.
        //sin que se cierren los demas modals.
        let modalContainer = saveBtn.parentElement.parentElement.parentElement;
        modalContainer.remove();
      },
      { passive: true }
    );
    return saveBtn;
  }

  changeNumRowsPerPage(inputParent) {
    if (inputParent) {
      let input = inputParent.querySelector('input');
      let span = inputParent.querySelector('span');

      let regVal = /^[0-9]*[0-9]+$/;

      input.addEventListener(
        'keydown',
        e => {
          if (e.key == 'Enter' && regVal.test(input.value) && input.value != this.numRowsPerPage) {
            this.numRowsPerPage = input.value > this.cantRows ? this.cantRows : input.value;
            this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
            this.ls.setItem(`numRowsPerPage${this.titulo}`, this.numRowsPerPage);
            this.renderRowActions();
            this.renderTrs();

            input.value = this.numRowsPerPage;
          }
        },
        { passive: true }
      );

      span.addEventListener(
        'click',
        () => {
          if (regVal.test(input.value) && input.value != this.numRowsPerPage) {
            this.numRowsPerPage = input.value > this.cantRows ? this.cantRows : input.value;
            this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
            this.ls.setItem(`numRowsPerPage${this.titulo}`, this.numRowsPerPage);
            this.renderRowActions();
            this.renderTrs();

            input.value = this.numRowsPerPage;
          }
        },
        { passive: true }
      );
    } else {
      if (this.ls.getItem(`numRowsPerPage${this.titulo}`)) {
        this.numRowsPerPage = this.ls.getItem(`numRowsPerPage${this.titulo}`);
      } else {
        this.ls.setItem(`numRowsPerPage${this.titulo}`, this.numRowsPerPage);
      }
    }
  }

  moveInRows(container_pages_nav) {
    let listUl = container_pages_nav.querySelector('ul');
    listUl.addEventListener(
      'click',
      evt => {
        let rowNavSelected = parseInt(evt.target.textContent, 10);
        if (!isNaN(rowNavSelected)) {
          this.actualPage = rowNavSelected;
          this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
          this.renderRowActions();
          this.renderTrs();
        }
      },
      { passive: true }
    );

    let listLi = container_pages_nav.querySelectorAll('li');
    listLi.forEach(li => {
      if (li.dataset.type) {
        li.addEventListener(
          'click',
          () => {
            if (li.dataset.type == 'rowRight') {
              this.actualPage--;
              this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
              this.renderRowActions();
              this.renderTrs();
            }
            if (li.dataset.type == 'rowLeft') {
              this.actualPage++;
              this.indexUltElement = this.actualPage * this.numRowsPerPage - this.numRowsPerPage;
              this.renderRowActions();
              this.renderTrs();
            }
          },
          { passive: true }
        );
      }
    });
  }

  replaceCharacter(str, char, newChar) {
    return str.replace(char, newChar);
  }

  capitalizarString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  stringToArray(string, replaceCharacter, ...serapated) {
    serapated.forEach(s => {
      string = string.replace(s, replaceCharacter);
    });
    let arr = string.split(replaceCharacter);
    if (arr[0] == 'int' || arr[0] == 'year') arr[0] = 'number';
    if (arr[0] == 'char' || arr[0] == 'varchar') arr[0] = 'text';
    if (arr[0] == 'date') arr[0] = 'date';
    if (arr[0] == 'enum') {
      arr[0] = 'text';
      arr[1] = '1';
    }
    return arr;
  }

  /* editarFila(idfila) {} */

  async agregarFilas() {
    let containerBody = document.createElement('div');
    let form = this.renderForm();

    let saveBtn = this.renderSaveFormBtn(form, 'add', 'Agregar');

    containerBody.append(form, saveBtn);
    this.renderModal(containerBody);
  }

  async editarFilas(tdCampos) {
    let containerBody = document.createElement('div');

    let form = this.renderForm(tdCampos);
    let saveBtn = this.renderSaveFormBtn(form, 'update', 'Actualizar');

    containerBody.append(form, saveBtn);
    this.renderModal(containerBody);
  }

  async eliminarFila(fila) {
    let id = fila.id.split('-').shift();
    this.trs = await this.tableRequest(null, `delete/${id}`, 'GET');
    this.renderTrs();
  }
}