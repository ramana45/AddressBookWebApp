let contactListLocalStorage;

window.addEventListener('DOMContentLoaded', (event) => {
    contactListLocalStorage = getContactListFromLocalStorage();
    createInnerHtml();
    document.querySelector(".contact-count").textContent = contactListLocalStorage.length;
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
        <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="${contact._id}" onclick="remove(this)">
        <img src="../assets/icons/create-black-18dp.svg" alt="edit" id="${contact._id}" onclick="update(this)">
    </td>
</tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
