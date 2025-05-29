GENERAL PREREQUISITES:

- Applications intended functionality is inherently intuitive

Test cases:

1. Validate that a list item can be created as incomplete and added to the list

   - Given I am on the application
   - When I click button "Add Task"
   - And write a title text
   - And set the status to "Incomplete"
   - And click button "Add Task"
   - Then an item with that title text should appear in the list
   - And the checkbox should not have a checkmark in it
   - And the title text should not have a line through it

   Test passes when: List item is created, checkbox on the list item is white, its title text is clear

2. Validate that a list item can be created as completed and added to the list

   - Given I am on the application
   - When I click button "Add Task"
   - And write a title text
   - And set the status to "Completed"
   - And click button "Add Task"
   - Then an item with that title text should appear in the list
   - And the checkbox should have a checkmark in it
   - And the title text should have a line through it

   Test passes when: List item is created, checkbox on the list item is blue and contain a checkmark, its title text has a line through it

3. Validate that an existing list item can be deleted

   - Given I am on the application
   - And the list contains an item
   - When I press the thrashbin button on the same row as a list item
   - Then the row with the item should disappear

   Test passes when: Existing list item is removed from the list

4. Validate that an existing list item can be edited

   - Given I am on the application
   - And the list contains an item with a title and is marked as incompleted
   - When I press the pencil button on the same row as a list item
   - And edit the title
   - And change status to "Completed"
   - And press "Update Task"
   - Then the item in the list should have the new title
   - And the title should have a line through it
   - And the checkbox should have a checkmark in it

   Test passes when: Existing list items title text change, unchecked checkbox becomes checked, clear title text gets a line through it

5. Validate that list items can be sorted by status completed/uncompleted/all

   - Given I am on the application
   - And the list contains two items
   - And they have different status
   - When I click the dropdownon the top right
   - And I change between status All/Completed/Incomplete
   - Then the list should only show list items reflecting the chosen status

   Test passes when: Changing filter setting only shows tasks of corresponding status
