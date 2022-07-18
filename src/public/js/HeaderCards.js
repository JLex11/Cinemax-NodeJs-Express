// eslint-disable-next-line no-unused-vars
class HeaderCards {
  principalContainer;
  headerItem;
  spanMaterialIcons;
  containerBody;
  tableAssoc;
  id;
  icon;
  bodyElements;

  constructor(principalContainer, contents) {
    this.principalContainer = document.getElementById(principalContainer);
    this.headerItem = document.createElement('a');
    this.containerBody = document.createElement('div');
    this.id = contents.id;
    this.icon = contents.icon;
    this.bodyElements = contents.bodyElements;
    this.tableReference = contents.tableReference;
    this.makeCard();
  }

  makeCard() {
    this.renderIcon();
    this.renderBody();

    this.headerItem.classList.add('header_item');
    this.headerItem.href = `#${this.id}`;
    this.principalContainer.appendChild(this.headerItem);
  }

  renderIcon() {
    let spanIcon = document.createElement('span');
    spanIcon.classList.add('material-symbols-outlined');
    spanIcon.innerText = this.icon;
    this.headerItem.appendChild(spanIcon);
  }

  renderBody() {
    this.containerBody.classList.add('container_body');
    let fragment = document.createDocumentFragment();

    this.bodyElements.forEach(bElement => {
      let bodyElement = document.createElement('div');
      bodyElement.classList.add('body_element');
      bodyElement.innerHTML = `
        <h5>${bElement.number}</h5>
        <h5>${bElement.name}</h5>`;

      fragment.appendChild(bodyElement);
    });

    this.containerBody.appendChild(fragment);
    this.headerItem.appendChild(this.containerBody);
  }
}
