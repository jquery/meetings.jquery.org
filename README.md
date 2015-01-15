meetings.jquery.org
===================

Calendar and minutes of public jQuery team meetings

To add minutes for a new Project, in [taxonomies.js](https://github.com/jquery/meetings.jquery.org/blob/master/taxonomies.js):
* Edit the two variables at the top of the file:
  * agendas:
    * key: the name of the folder holding the minutes
    * value: URL for the current agenda document
  * taxonomies:
    * slug: should match the name of the folder
    * name: the display name that will show up in the navigation on the left-hand side and other places
    * description: description for what this is
* Add the minutes:
  * Create a new folder corresponding to the agendas' key, inside the minutes folder
  * Add the minutes in the new folder
