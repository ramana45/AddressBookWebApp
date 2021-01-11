let contactListLocalStorage;

window.addEventListener('DOMContentLoaded', (event) => {
    contactListLocalStorage = getContactListFromLocalStorage();
    createInnerHtml();
    document.querySelector(".contact-count").textContent = contactListLocalStorage.length;
    localStorage.removeItem('editContact');
});

const getContactListFromLocalStorage = () => {
    return localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const createInnerHtml = () => {
    if (contactListLocalStorage.length == 0) return;
    const headerHtml = "<th>Full Name</th><th>Address</th>" +
        "<th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const contact of contactListLocalStorage) {
        innerHtml = `${innerHtml}
<tr>
    <td>${contact._fullName}</td>
    <td>${contact._address}</td>
    <td>${contact._city}</td>
    <td>${contact._state}</td>
    <td>${contact._zip}</td>
    <td>${contact._phoneNumber}</td>
    <td>
        <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="${contact.id}" onclick="remove(this)">
        <img src="../assets/icons/create-black-18dp.svg" alt="edit" id="${contact.id}" onclick="update(this)">
    </td>
</tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contact = contactListLocalStorage.find(contactInList => contactInList.id == node.id);
    if (!contact) return;
    const index = contactListLocalStorage
                        .map(contactInList => contactInList.id)
                        .indexOf(contact.id);
    contactListLocalStorage.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(contactListLocalStorage));
    document.querySelector(".contact-count").textContent = contactListLocalStorage.length;
    createInnerHtml();
} 

const update = (node) => {
    let contact = contactListLocalStorage.find(contactInList => contactInList.id == node.id);
    if (!contact) return;
    localStorage.setItem('editContact', JSON.stringify(contact));
    window.location.replace(site_properties.add_address_book_form_page);
}