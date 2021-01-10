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
        createAddressBookContactData();
        createAndUpdateLocalStorage();
        window.location.replace(site_properties.home_page);
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

const createAddressBookContactData = () => {
    let contactData = new AddressBookContact();
    setContactData(contactData);
    return contactData;
}

const setContactData = (contactData) => {
    try {
        contactData.fullName = addressBookContactJSONObject._fullName;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        contactData.address = addressBookContactJSONObject._address;
    } catch (e) {
        setTextValue('.address-error', e);
        throw e;
    }
    try {
        contactData.phoneNumber = addressBookContactJSONObject._phoneNumber;
    } catch (e) {
        setTextValue('.mobno-error', e);
        throw e;
    }
    contactData.city = addressBookContactJSONObject._city;
    contactData.state = addressBookContactJSONObject._state;
    contactData.zip = addressBookContactJSONObject._zip;
    alert(contactData.toString());
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const createAndUpdateLocalStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
        addressBookList.push(createAddressBookContactData());
    } else {
        addressBookList = [createAddressBookContactData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const resetForm = () => {
    setValue('#fullName', '');
    setValue('#address', '');
    setValue('#tel', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
