import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../components/ContactList";
import {
  ContactState,
  addContact,
  deleteContact,
  editContact,
} from "../store/reducers/contactSlice";
import { RootState } from "../store/store";

const uniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newContact, setNewContact] = useState<ContactState>({
    id: uniqueId(),
    name: "",
    email: "",
    phone: "",
    status: false,
  });

  // functions

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewContact({
      id: uniqueId(),
      name: "",
      email: "",
      phone: "",
      status: false,
    });
    setIsEdit(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "status") {
      // Update the status field based on the selected value
      const isStatusActive = value === "active";
      setNewContact((prevContact) => ({
        ...prevContact,
        status: isStatusActive,
      }));
    } else {
      // Update other input fields
      setNewContact((prevContact) => ({
        ...prevContact,
        [name]: value,
      }));
    }
  };

  const handleAddContact = () => {
    dispatch(addContact(newContact));
    setNewContact({
      id: uniqueId(),
      name: "",
      email: "",
      phone: "",
      status: false,
    });
    setOpenDialog(false);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleToggleStatus = (id: string) => {
    dispatch(
      editContact({
        id,
        name: contacts.find((contact) => contact.id === id)?.name || "",
        email: contacts.find((contact) => contact.id === id)?.email || "",
        phone: contacts.find((contact) => contact.id === id)?.phone || "",
        status: !contacts.find((contact) => contact.id === id)?.status,
      })
    );
  };

  const handleEditContact = (id: string) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      setOpenDialog(true);
      setNewContact(contact);
      setIsEdit(true);
    }
  };

  const handleUpdateContact = () => {
    dispatch(
      editContact({
        id: newContact.id,
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        status: newContact.status,
      })
    );
    setOpenDialog(false);
    setIsEdit(false);

    setNewContact({
      id: uniqueId(),
      name: "",
      email: "",
      phone: "",
      status: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Button variant="contained" onClick={handleOpenDialog}>
        Create Contact
      </Button>

      {/* no contacts section */}
      {contacts.length === 0 && (
        <Alert className="mt-4 w-100 sm:w-80" severity="error">
          No contacts found. Please add a contact using the "Create Contact"
          button.
        </Alert>
      )}

      {/* contact list section */}
      {contacts.length > 0 && (
        <ContactList
          contacts={contacts}
          handleDeleteContact={handleDeleteContact}
          handleToggleStatus={handleToggleStatus}
          handleEditContact={handleEditContact}
        />
      )}

      {/* create contact dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create Contact</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newContact.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newContact.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={newContact.phone}
            onChange={handleInputChange}
          />

          <div className="flex items-center mt-2">
            <span>Status:</span>
            <div className="ml-2">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={newContact.status}
                  onChange={handleInputChange}
                />
                Active
              </label>
            </div>
            <div className="ml-2">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={!newContact.status}
                  onChange={handleInputChange}
                />
                Inactive
              </label>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={isEdit ? handleUpdateContact : handleAddContact}>
            {isEdit ? "Update Contact" : "Add Contact"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactsPage;
