import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import Switch from "@mui/material/Switch";
import React from "react";
import { ContactState } from "../store/reducers/contactSlice";

type ContactListProps = {
  contacts: ContactState[];
  handleDeleteContact: (id: string) => void;
  handleToggleStatus: (id: string) => void;
  handleEditContact: (id: string) => void;
};

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  handleDeleteContact,
  handleToggleStatus,
  handleEditContact,
}) => {
  return (
    <>
      <List
        className="mt-4 
       sm:w-1/2
      "
      >
        {contacts.map((contact) => (
          <ListItem
            key={contact.id}
            className="flex items-center justify-between gap-4 bg-gray-900 rounded-lg p-4 shadow-md"
          >
            <div className="flex-grow">
              <PermIdentityIcon className="text-gray-500 mr-2" />
              <ListItemText
                primary={contact.name}
                secondary={contact.email}
                secondaryTypographyProps={{ style: { color: "#fff" } }}
                className={contact.status ? "text-green-500" : ""}
              />
            </div>
            <div className="flex gap-2">
              <Switch
                checked={contact.status}
                onChange={() => handleToggleStatus(contact.id)}
                color="primary"
              />
              <Button
                onClick={() => handleEditContact(contact.id)}
                variant="contained"
                color="primary"
              >
                <EditIcon />
              </Button>
              <Button
                onClick={() => handleDeleteContact(contact.id)}
                variant="contained"
                color="error"
              >
                <DeleteIcon />
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ContactList;
