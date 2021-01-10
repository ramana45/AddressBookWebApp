let addressBookContactJSONObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const fullName = document.querySelector('#fullName');
    const textError = document.querySelector('.text-error');
    fullName.addEventListener('input', function () {
        if (fullName.value.length == 0) {
            textError.textContent = "";
            return
        }
        try {
            (new AddressBookContact()).fullName = fullName.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const phoneNo = document.querySelector('#tel');
    const phoneError = document.querySelector('.mobno-error');
    phoneNo.addEventListener('input', function () {
        if (phoneNo.value.length == 0) {
            phoneError.textContent = "";
            return
        }
        try {
            (new AddressBookContact()).phoneNumber = phoneNo.value;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return
        }
        try {
            (new AddressBookContact()).address = address.value;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookContactObject();
    } catch (e) {
        alert(e);
        return;
    }
}

const setAddressBookContactObject = () => {
    addressBookContactJSONObject._fullName = getInputValueById('#fullName');
    addressBookContactJSONObject._address = getInputValueById('#address');
    addressBookContactJSONObject._phoneNumber = getInputValueById('#tel');
    addressBookContactJSONObject._city = getInputValueById('#city');
    addressBookContactJSONObject._state = getInputValueById('#state');
    addressBookContactJSONObject._zip = getInputValueById('#zip');
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}