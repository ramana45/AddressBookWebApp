let isUpdate = false;
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

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookContactObject();
        createAndUpdateLocalStorage();
        resetForm();
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

const createAndUpdateLocalStorage = () => {
    let contactList  = JSON.parse(localStorage.getItem("AddressBookList"));
    if (contactList ) {
        let contactData = contactList 
                            .find(contact => contact._id == addressBookContactJSONObject._id);
        if(!contactData) {
            contactList.push(createAddressBookContactData());
        }
        else {
            const index = contactList
                            .map(contact => contact._id)
                            .indexOf(contactData._id);
            contactList.splice(index, 1, createAddressBookContactData(contactData._id));
        }
    } else {
        contactList = [createAddressBookContactData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(contactList));
}

const createAddressBookContactData = (id) => {
    let contactData = new AddressBookContact();
    if (!id) contactData._id = createNewContactId();
    else contactData._id = id;
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

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if (!isUpdate) return;
    addressBookContactJSONObject = JSON.parse(contactJson);
    setForm();
}

const setForm = () => {
    setValue('#fullName', addressBookContactJSONObject._fullName);
    setValue('#address', addressBookContactJSONObject._address);
    setValue('#tel', addressBookContactJSONObject._phoneNumber);
    setValue('#city', addressBookContactJSONObject._city);
    setValue('#state', addressBookContactJSONObject._state);
    setValue('#zip', addressBookContactJSONObject._zip);
}

const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactID");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactID", contactId);
    return contactId;
}
