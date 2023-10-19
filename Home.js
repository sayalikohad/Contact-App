import React, { useEffect,useState}  from 'react'
import "./Home.css"
import ContactCard from '../../components/ContactCard/ContactCard'
import showToast from 'crunchy-toast';

function Home() {
    const [contacts, setContacts] = useState([
        {
            name: 'Pappa',
            mobile: '8928252355',
            email: 'laxman@gmail.com'
        },
        {
            name: 'Saba',
            mobile: '7632969148',
            email: 'saba2003@gmail.com'
        },
        {
            name: 'Shirish',
            mobile: '7378889689',
            email: 'shirish@gmail.com'
        },
        {
            name: 'Anil',
            mobile: '9356881712',
            email: 'anil123@gmail.com'
        },
        {
            name: 'Ganesh',
            mobile: '7666534107',
            email: 'ganeshsawate@gmail.com'
        },
    ]);

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [isEditMode, setIsEditMote] = useState(false);

    const addContact = () => {

        if(!name){
            showToast('Name is required', 'alert', 3000);
            return;
        }

        if(!email){
            showToast('Email is required', 'alert', 3000);
            return;
        }

        if(!mobile){
            showToast('Mobile is required', 'alert', 3000);
            return;
        }

        const obj = {
            name: name,
            email: email,
            mobile: mobile
        }

        const newContacts = [...contacts, obj];
    
        setContacts(newContacts);
        saveToLocalStorage(newContacts);

        showToast('Contact Added Successfully', 'success', 3000);

        setName('');
        setEmail('');
        setMobile('');
    };

    const deleteContact = (mobileNumber) => {
        let indexToDelete = -1;

        contacts.forEach((contactDetail, index)=>{
            if(contactDetail.mobile == mobileNumber){
                indexToDelete = index;
            }
        })

        contacts.splice(indexToDelete, 1);

        setContacts([...contacts])

        showToast('contact Deleted Successfully', 'success',3000);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    const loadFromalStroage = () => {
        const ContactsData = JSON.parse(localStorage.getItem('contacts'));

        if(ContactsData){
            setContacts(ContactsData);
        }
    }

    const enableEditMode = 
    (index) => {
        const contactData = contacts[index];

        setName(contactData.name);
        setEmail(contactData.email);
        setMobile(contactData.mobile);

        setEditIndex(index);
        setIsEditMote(true);
    }

    const editContact = () => {
        const obj = {
            name: name,
            email: email,
            mobile: mobile
        }

        contacts[editIndex] = obj;

        setContacts([...contacts]);

        saveToLocalStorage(contacts);

        showToast('Contact Edited Successfully', 'success', 3000);

        setName('');
        setEmail('');
        setMobile('');

        setIsEditMote(false);
    }

    useEffect(()=>{
        loadFromalStroage();
    }, [])

    
    return( 
        <div>
            <h1 className='app-title'>📞Contact App</h1>

            <div className='app-body'>
                <div className='contacts-container'>
                    <h2 className='sub-heading'>Show Contacts</h2>
                    {
                        contacts.map((contact, index)=>{
                            const {name, mobile,email} = contact;
                            return (<ContactCard
                            key={index}
                            name={ContactCard.name}
                            email={ContactCard.email}
                            mobile={ContactCard.mobile}
                            deleteContact={deleteContact}
                            enableEditMode={ enableEditMode}
                            index={index}
                            />)
                        })
                    }
                </div>

                <div className='add-contacts-container'>
                    <h2 className='sub-heading'>
                        {isEditMode ? 'Edit Contact' : 'Add Contact'}
                    </h2>
                    <form>
                        <input 
                            type='text' 
                            placeholder='Name' 
                            className='user-input'
                            onChange={(e)=>{
                                setName(e.target.value)
                            }}
                            value={name}
                        />

                        <input 
                            type='email'
                            placeholder='Email'
                            className='user-input'
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />

                        <input 
                            type='text'
                            placeholder='Mobile'
                            className='user-input'
                            onChange={(e)=>{
                            setMobile(e.target.value)
                            }} 
                            value={mobile}
                        />

                        <button
                         type='button' 
                         className='btn-add-contact'
                         onClick={()=>{
                            isEditMode ? editContact() : addContact()
                         }}
                         >
                            {isEditMode ? 'Edit Contact' : 'Add Contact'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Home