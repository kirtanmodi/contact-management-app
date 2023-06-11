# Contact Management App with Charts and Maps

This is a contact management app with charts and maps built using ReactJS, TypeScript, TailwindCSS, React Router v6, and React Query (TanstackQuery). The app allows you to manage contacts, view contact details, edit and delete contacts, and visualize COVID-19 cases data through charts and maps.

### Contacts Page

- Add new contacts using the provided form.
- View a list of all added contacts.
- Click on the edit contact to view its details.
- Edit or delete contacts.

### Charts and Maps Page

- Line, Bar, Pie graph showing COVID-19 cases fluctuations worldwide.
- React Leaflet map with markers indicating country-wise COVID-19 cases. The markers display the country name, total number of active, recovered cases, and deaths in a popup.

## APIs Used

- World-wide data of cases: [https://disease.sh/v3/covid-19/all](https://disease.sh/v3/covid-19/all)
- Country-specific data of cases: [https://disease.sh/v3/covid-19/countries](https://disease.sh/v3/covid-19/countries)
- Graph data for cases with date: [https://disease.sh/v3/covid-19/historical/all?lastdays=all](https://disease.sh/v3/covid-19/historical/all?lastdays=all)

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation and Usage

1. Clone the repository:

```bash
git clone https://github.com/kirtanmodi/contact-management-app.git
```
