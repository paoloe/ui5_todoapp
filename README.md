# ui5_todoapp
Simple to do app UI5 training.

## Requirements:

- [ ]	I want to be able to add todo list items to my todo list
-  for this just need an input interface then functionality to add to the JSON file
- [ ]	I want to be able to complete my todo list items and view them in a completed list
- this will require again JSON modify functionality; when completed change the property that it now belongs in completed list; then log completed time/date
- [ ]	I want to be able to track dates of my todo list items
- there are already date properties for actions so this will just need to be displayed somehwere
- it should also be considered when the user is inputting data to log date/time
- [ ]	I want to be able to track times of my todo list items
- same notes as above
- [ ]	I want to be able to edit the titles of existing todo list items
- maybe edit this in the detailedDetailed view so that there is only one place where editing happens?

## View Structure:

List Structure Explained:
1. Master View: Contains 'To Do' and 'Compeleted' when one is selected one should open the detailed view of that list
    - Detailed View: Contents of master list
      - Detailed x2 View: Notes on particular item from detailed view
