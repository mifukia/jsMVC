// ============== Model =========================

class AddressBookModel {
    constructor() {
        this._contactsData = [{
            'fname': 'Anbu',
            'lname': 'Arasan',
            'phone': '190-309-6101',
            'email': 'anbu.arasan@email.com'
        }, {
            'fname': 'Arivu',
            'lname': 'Mugilan',
            'phone': '490-701-7102',
            'email': 'arivu.mugilan@email.com'
        }, {
            'fname': 'Bob',
            'lname': 'Johnson',
            'phone': '574-909-3948',
            'email': 'bob.johnson@email.com'
        }, {
            'fname': 'Raja',
            'lname': 'Tamil',
            'phone': '090-909-0101',
            'email': 'raja.tamil@email.com'
        }, {
            'fname': 'Sundar',
            'lname': 'Kannan',
            'phone': '090-909-0101',
            'email': 'sundar.kannan@email.com'
        }];
    }
    getContacts() {
        return this._contactsData;
    }
    getContact(index) {
        return this._contactsData[index];
    }
    addContact(contact) {
        this._contactsData.push(contact);
    }
}

// ============== View ============================

class AddressBookView {
    init() {
        this.renderContactListModule();
        this.renderContactDetailModule(0);
        this.addContactModule();
    }
    renderContactListModule() {
        //すべての連絡先を取得
        const contacts = addressBookApp.getContacts();
        //cache
        const $contactListUI = document.getElementById('contact-list');
        // clear HTML from the DOM
        $contactListUI.innerHTML = '';

        for (let i = 0, len = contacts.length; i < len; i++) {
            let $li = document.createElement('li');
            $li.setAttribute('class', 'contact-list-item');
            $li.setAttribute('data-index', i);
            $li.innerHTML = `${contacts[i]['fname']},${contacts[i]['lname']}`;
            $li.addEventListener('click', (e) => {
                this.renderContactDetailModule(e)
            });
            $contactListUI.append($li);
        }
    }
    renderContactDetailModule(e) {
        let selectedIndex = null;
        if (typeof e === 'object') {
            e.preventDefault();
            selectedIndex = e.currentTarget.getAttribute('data-index');
        } else {
            selectedIndex = e;
        }
        const selectedItem = addressBookApp.getContact(selectedIndex);
        const $ContactItemUI = document.getElementById('contact-item-details');
        $ContactItemUI.innerHTML = `${selectedItem['fname']}<br>${selectedItem['phone']}<br>${selectedItem['email']}`;
        this.hightlightCurrentListItem(selectedIndex);
    }
    hightlightCurrentListItem(selectedIndex) {
        const $ContactListItems = document.getElementsByClassName('contact-list-item');
        for (let item of $ContactListItems) {
            item.classList.remove('active');
        }
        $ContactListItems[selectedIndex].classList.add('active');
    }
    addContactModule() {
        const $addContact = document.getElementById('add-contact-btn');
        $addContact.addEventListener('click', () => {
            this.addContactBtnClicked();
        })
    }
    addContactBtnClicked() {
        const $addContactInputs = document.getElementsByClassName('add-contact-input');
        let newContact = {};
        for (let item of $addContactInputs) {
            const key = item.getAttribute('data-key');
            const value = item.value;
            newContact[key] = value;
        }
        addressBookApp.addContact(newContact);
        this.renderContactListModule();
    }
}

const addressBookView = new AddressBookView();

//================ Controller ==================

class AddressBookCtrl {
    constructor(addressBookView) {
        this.addressBookModel = new AddressBookModel();
        this.addressBookView = addressBookView;
    }
    init() {
        this.addressBookView.init();
    }
    getContacts() {
        return this.addressBookModel.getContacts();
    }
    getContact(index) {
        return this.addressBookModel.getContact(index);
    }
    addContact(contact) {
        this.addressBookModel.addContact(contact);
    }
}

const addressBookApp = new AddressBookCtrl(addressBookView);

addressBookApp.init();